import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionDetailDto } from './dto/get-detail-collection.dto';
import { CollectionEntity } from './entities/collection.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CONTRACT_TYPE, Prisma, TX_STATUS, User } from '@prisma/client';
import { validate as isValidUUID } from 'uuid';
import { Redis } from 'src/database';
import { TraitService } from '../nft/trait.service';
import { GetAllCollectionDto } from './dto/get-all-collection.dto';
import { GetCollectionMarketData } from '../graph-qlcaller/getCollectionMarketData.service';
import { CollectionPriceService } from './collectionPrice.service';
import { GetCollectionByUserDto } from './dto/get-collection-by-user.dto';
import SecureUtil from '../../commons/Secure.common';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../generated/graphql';
import { oneWeekInMilliseconds } from '../../constants/Timestamp.constant';
import OtherCommon from 'src/commons/Other.common';
import {
  creatorSelect,
  collectionSelect,
} from '../../commons/definitions/Constraint.Object';
import PaginationCommon from 'src/commons/HasNext.common';
interface CollectionGeneral {
  totalOwner: number;
  volumn: string;
  totalNft: number;
  // floorPrice: bigint;
}

interface CollectionVolumeInterface {
  timestamp: string;
  total: string;
}

interface CollectionOwnernterface {
  timestamp: string;
  total: string;
  lastId: string;
}

@Injectable()
export class CollectionService {
  constructor(
    private prisma: PrismaService,
    private traitService: TraitService,
    private readonly collectionData: GetCollectionMarketData,
    private readonly collectionPriceService: CollectionPriceService,
  ) {}

  private readonly endpoint = process.env.SUBGRAPH_URL;
  private client = this.getGraphqlClient();
  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }

  private sdk = getSdk(this.client);

  async create(input: CreateCollectionDto, user: User): Promise<any> {
    try {
      const checkExist = await this.prisma.collection.findFirst({
        where: {
          OR: [
            { txCreationHash: input.txCreationHash },
            { name: input.name },
            { shortUrl: input.shortUrl },
          ],
        },
      });
      if (checkExist) {
        throw new Error(
          'Transaction hash or name or Short URL are already exists',
        );
      } else {
        const collection = await this.prisma.collection.create({
          data: {
            txCreationHash: input.txCreationHash,
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            status: TX_STATUS.PENDING,
            type: input.type,
            ...(input.shortUrl && { shortUrl: input.shortUrl }),
            coverImage: input.coverImage,
            metadata: input.metadata,
            avatar: input.avatar,
            // categoryId: ...(input.categoryId  Number(input.categoryId),
            ...(input.categoryId && { categoryId: Number(input.categoryId) }),
          },
        });

        await this.prisma.userCollection.create({
          data: {
            userId: user.id,
            collectionId: collection.id,
          },
        });
        await Redis.publish('collection-channel', {
          data: {
            txCreation: collection.txCreationHash,
            type: collection.type,
          },
          process: 'collection-create',
        });
        return collection;
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getGeneralCollectionData(
    collectionAddress: string,
    type: CONTRACT_TYPE,
  ): Promise<CollectionGeneral> {
    if (!collectionAddress) {
      return {
        volumn: '0',
        totalOwner: Number(0),
        totalNft: Number(0),
        // floorPrice: BigInt(0),
      };
    }
    const [statusCollection] = await Promise.all([
      this.collectionData.getCollectionCount(collectionAddress),
      // this.getVolumeCollection(collectionAddress),
    ]);

    if (type === 'ERC721') {
      return {
        // volumn: sum.toString(),
        volumn: statusCollection.erc721Contract?.volume || 0,
        totalOwner: statusCollection.erc721Contract?.holderCount || 0,
        totalNft: statusCollection.erc721Contract?.count || 0,
        // floorPrice: BigInt(0),
      };
    } else {
      return {
        // volumn: sum.toString(),
        volumn: statusCollection.erc721Contract?.volume || 0,
        totalOwner: statusCollection.erc1155Contract?.holderCount || 0,
        totalNft: statusCollection.erc1155Contract?.count || 0,
        // floorPrice: BigInt(0),
      };
    }
  }

  async findAll(
    input: GetAllCollectionDto,
  ): Promise<PagingResponseHasNext<CollectionEntity>> {
    // TODO: get all collection from subgraph first, got the id and map it back to local collection
    const creators = await this.prisma.user.findMany({
      where: {
        publicKey: {
          in: input.creatorAddresses,
          mode: 'insensitive',
        },
      },
    });
    const minBigInt = input.min
      ? BigInt(input.min) / BigInt(10) ** 18n
      : undefined;
    const maxBigInt = input.max
      ? BigInt(input.max) / BigInt(10) ** 18n
      : undefined;
    const addresses = creators.map((item) => item.id);
    let whereCondition: Prisma.CollectionWhereInput = {
      ...(input.name && {
        nameSlug: {
          contains: OtherCommon.stringToSlugSearch(input.name),
          mode: 'insensitive',
        },
      }),
      creators: {
        some: {
          userId: {
            in: addresses,
          },
        },
      },
      status: TX_STATUS.SUCCESS,
    };
    if (input.min) {
      whereCondition = {
        ...whereCondition,
        floorPrice: {
          gte: minBigInt,
        },
      };
    }

    if (input.max) {
      whereCondition = {
        ...whereCondition,
        floorPrice: {
          lte: maxBigInt,
        },
      };
    }

    if (input.min && input.max) {
      whereCondition = {
        ...whereCondition,
        floorPrice: {
          gte: minBigInt,
          lte: maxBigInt,
        },
      };
    }
    console.log(whereCondition);

    if (input.max && input.min && BigInt(input.min) > BigInt(input.max)) {
      return {
        data: [],
        paging: {
          hasNext: false,
          page: input.page,
          limit: input.limit,
        },
      };
    }
    const orderByProperties: Prisma.CollectionOrderByWithRelationAndSearchRelevanceInput =
      {};
    if (input.orderBy == 'time') {
      orderByProperties.createdAt = input.order;
    } else {
      orderByProperties.floorPrice = input.order;
    }

    const collections = await this.prisma.collection.findMany({
      where: whereCondition,
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      orderBy: orderByProperties,
      include: {
        creators: {
          select: {
            userId: true,
            user: {
              select: creatorSelect,
            },
          },
        },
      },
    });
    // const subgraphCollection = collections.map(async (item) => {
    //   const generalInfo = await this.getGeneralCollectionData(
    //     item.address,
    //     item.type,
    //   );
    //   return { ...item, ...generalInfo };
    // });
    // const dataArray = Promise.all(subgraphCollection);

    const dataArray = await Promise.all(
      collections.map(async (item) => {
        const generalInfo = await this.getGeneralCollectionData(
          item.address,
          item.type,
        );
        return { ...item, ...generalInfo };
      }),
    );
    const hasNext = await PaginationCommon.hasNextPage(
      input.page,
      input.limit,
      'collection',
      whereCondition,
    );
    return {
      data: await dataArray,
      paging: {
        hasNext,
        limit: input.limit,
        page: input.page,
      },
    };
    // }
  }

  async findOne(id: string): Promise<CollectionDetailDto> {
    try {
      const whereCondition: Prisma.CollectionWhereInput = {};
      whereCondition.OR = [];
      if (!isValidUUID(id)) {
        whereCondition.OR.push({ shortUrl: id }, { address: id });
      } else {
        whereCondition.OR.push({ id });
      }

      const collection = await this.prisma.collection.findFirst({
        where: whereCondition,
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          creators: {
            select: {
              userId: true,
              user: {
                select: creatorSelect,
              },
            },
          },
        },
      });
      if (!collection) {
        throw new NotFoundException();
      }
      const { id: collectionId, address, type } = collection;

      // Parallelize async operations
      const [traitsAvailable, generalInfo, royalties] = await Promise.all([
        this.traitService.findUniqueTraitsInCollection(collectionId),
        this.getGeneralCollectionData(address, type),
        this.collectionPriceService.FetchRoyaltiesFromGraph(address),
      ]);
      const totalRoyalties = royalties.reduce(
        (acc, item) => acc + item.value,
        0,
      );

      const collectionReponse = {
        ...collection,
        totalRoyalties,
        listRoyalties: royalties,
      };

      return {
        collection: collectionReponse,
        traitAvailable: traitsAvailable,
        generalInfo,
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    input: UpdateCollectionDto,
    user: User,
  ): Promise<any> {
    try {
      // Validate ID
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again!');
      }

      // Check if Collection Exists
      const existingCollection = await this.prisma.collection.findFirst({
        where: { id: id },
      });

      if (!existingCollection) {
        throw new NotFoundException();
      }

      // Check if User is the Creator of the Collection
      const isCreator = await this.prisma.userCollection.findFirst({
        where: { AND: [{ userId: user.id }, { collectionId: id }] },
      });

      if (!isCreator) {
        throw new Error(`You can't update this collection`);
      }

      const dataUpdateCollection: Prisma.CollectionUpdateInput = {};

      if (input.description) {
        dataUpdateCollection.description = input.description;
      }

      if (input.coverImage) {
        dataUpdateCollection.coverImage = input.coverImage;
      }

      if (input.shortUrl) {
        // Add a condition to check if input.shortUrl is different from existing shortUrl
        if (
          !existingCollection.shortUrl ||
          input.shortUrl !== existingCollection.shortUrl
        ) {
          dataUpdateCollection.shortUrl = input.shortUrl;
        }
      }

      // Update Collection
      try {
        const updatedCollection = await this.prisma.collection.update({
          where: { id: id },
          data: dataUpdateCollection,
        });
        return updatedCollection;
      } catch (error) {
        throw new Error(`Short URL already exists`);
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findWithUserIDOrAddress(
    id: string,
    input: GetCollectionByUserDto,
  ): Promise<PagingResponse<CollectionEntity>> {
    try {
      let isUuid = true;
      if (!isValidUUID(id)) {
        isUuid = false;
      }
      const userWithCollection = await this.prisma.userCollection.findMany({
        where: {
          user: {
            ...(isUuid ? { id } : { OR: [{ signer: id }, { shortLink: id }] }),
          },
        },
        skip: (input.page - 1) * input.limit,
        take: input.limit,
        include: {
          collection: {
            select: collectionSelect,
          },
        },
      });
      const response = userWithCollection.map((item) => {
        return { collection: item.collection };
      });

      if (input.hasBase) {
        const baseCollection721 = await this.prisma.collection.findUnique({
          where: {
            address: process.env.BASE_ADDR_721,
          },
          include: {
            category: true,
          },
        });
        const baseCollection1155 = await this.prisma.collection.findUnique({
          where: {
            address: process.env.BASE_ADDR_1155,
          },
          include: {
            category: true,
          },
        });

        response.push({ collection: baseCollection721 });
        response.push({ collection: baseCollection1155 });
      }

      const total = await this.prisma.userCollection.count({
        where: {
          user: {
            ...(isUuid ? { id } : { OR: [{ signer: id }, { shortLink: id }] }),
          },
        },
      });

      const collections = response.map((i) => i.collection);

      const subgraphCollection = collections.map(async (item) => {
        const generalInfo = await this.getGeneralCollectionData(
          item.address,
          item.type,
        );
        return { ...item, ...generalInfo };
      });
      const dataArray = await Promise.all(subgraphCollection);
      return {
        data: dataArray,
        paging: {
          total: total,
          limit: input.limit,
          page: input.page,
        },
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async checkRecord(address: string) {
    try {
      const result = await SecureUtil.getSessionInfo(address);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async saveVolumeCollection(
    address: string,
    input: CollectionVolumeInterface,
  ) {
    try {
      const result = await SecureUtil.storeObjectSession(
        address,
        input,
        oneWeekInMilliseconds,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async saveOwnerCollection(address: string, input: CollectionOwnernterface) {
    try {
      const result = await SecureUtil.storeObjectSession(
        address,
        input,
        oneWeekInMilliseconds,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  // async getVolumeCollection(address: string) {
  // return '0';
  // const { blocks = [] } = await this.sdk.getActivity({ address });
  // const redisData = await this.checkRecord(address);
  // const lastUpdate = `${blocks?.[0]?.timestampt || ''}`;
  // const isTradeOrAcceptBid = (item: any) =>
  //   item.event === 'Trade' || item.event === 'AcceptBid';
  // const sum = blocks
  //   .filter(isTradeOrAcceptBid)
  //   .reduce((acc, obj) => acc + BigInt(obj.price), BigInt(0));
  // if (redisData !== null) {
  //   const redisTimestamp = parseInt(redisData.timestamp, 10);
  //   const newBlocks = blocks.filter(
  //     (item) => item.timestampt > redisTimestamp,
  //   );
  //   if (newBlocks.length > 0) {
  //     const sumNewBlock = newBlocks
  //       .filter(isTradeOrAcceptBid)
  //       .reduce((acc, obj) => acc + BigInt(obj.price), BigInt(0));
  //     const updatedTotal = (BigInt(redisData.total) + sumNewBlock).toString();
  //     await this.saveVolumeCollection(address, {
  //       timestamp: lastUpdate,
  //       total: updatedTotal,
  //     });
  //     return updatedTotal;
  //   }
  //   return sum;
  // } else {
  //   await this.saveVolumeCollection(address, {
  //     timestamp: lastUpdate,
  //     total: sum.toString(),
  //   });
  //   return sum;
  // }
  // }

  async getCountOwnerCollection(address: string) {
    const { ownedTokenCounts = [] } = await this.sdk.GetUniqueOwnersCount({
      contractAddress: address,
    });
    const redisData = await this.checkRecord(`${address}-owner`);
    const lastUpdate = `${ownedTokenCounts?.[0]?.timestamp || ''}`;
    const lastId = `${ownedTokenCounts?.[0]?.id || ''}`;

    if (redisData !== null) {
      const totalOwner = redisData.total;
      const redisTimestamp = parseInt(redisData.timestamp, 10);
      const redisLastId = redisData.lastId;

      const newOwner = ownedTokenCounts.filter(
        (item) =>
          item.timestamp > redisTimestamp ||
          (item.timestamp === redisTimestamp && item.id !== redisLastId),
      );

      if (newOwner.length > 0) {
        const newTotalOwner = newOwner.length;

        const updatedTotal = (
          BigInt(redisData.total) + BigInt(newTotalOwner)
        ).toString();
        await this.saveOwnerCollection(`${address}-owner`, {
          lastId: lastId,
          timestamp: lastUpdate,
          total: updatedTotal,
        });
        return updatedTotal;
      }
      return totalOwner;
    } else {
      const totalOwnerNullable = ownedTokenCounts.length;
      await this.saveOwnerCollection(`${address}-owner`, {
        lastId: lastId,
        timestamp: lastUpdate,
        total: totalOwnerNullable.toString(),
      });
      return totalOwnerNullable;
    }
  }

  async updateFloorPrice(collection: string) {
    await Redis.publish('collectionUtils-channel', {
      data: collection,
      process: 'update-floor-price',
    });
    return true;
  }
}
