import { CreateNftDto } from './dto/create-nft.dto';
import { Prisma, TX_STATUS, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NftDto } from './dto/nft.dto';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate as isValidUUID } from 'uuid';
import { Redis } from 'src/database';
import { GetAllNftDto } from './dto/get-all-nft.dto';
import { GraphQlcallerService } from '../graph-qlcaller/graph-qlcaller.service';
import { MarketplaceService } from './nft-marketplace.service';
import { SellStatus } from 'src/generated/graphql';
import { ZERO_ADDR } from 'src/constants/web3Const/messages';
import { OwnerOutputDto } from '../user/dto/owners.dto';
import { ValidatorService } from '../validator/validator.service';
import { GraphQLClient } from 'graphql-request';
import { GetActivityBase } from './dto/activity-nft.dto';
import { ActivityService } from './activity.service';
import { NftEntity } from './entities/nft.entity';
import { CollectionPriceService } from '../collection/collectionPrice.service';
import OtherCommon from 'src/commons/Other.common';
import { creatorSelect } from '../../commons/definitions/Constraint.Object';

@Injectable()
export class NftService {
  constructor(
    private prisma: PrismaService,
    private readonly GraphqlService: GraphQlcallerService,
    private readonly eventService: MarketplaceService,
    private validatorService: ValidatorService,
    private activityService: ActivityService,
    private collectionPriceService: CollectionPriceService,
  ) {}

  private readonly endpoint = process.env.SUBGRAPH_URL;
  private client = this.getGraphqlClient();
  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }
  async crawlNftInfo(collectionAddress: string, txCreation?: string) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: { address: collectionAddress.toLowerCase() },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      if (!txCreation) {
        await Redis.publish('nft-channel', {
          data: {
            type: collection.type,
            collectionAddress: collection.address,
          },
          process: 'nft-crawl-collection',
        });
        return true;
      } else {
        await Redis.publish('nft-channel', {
          data: {
            type: collection.type,
            txCreation: txCreation,
          },
          process: 'nft-crawl-single',
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async create(input: CreateNftDto, user: User): Promise<NftDto> {
    try {
      const checkExist = await this.prisma.nFT.findFirst({
        where: {
          txCreationHash: input.txCreationHash,
        },
      });
      if (checkExist) {
        throw new BadRequestException('Transaction already submitted');
      }
      const collection = await this.prisma.collection.findFirst({
        where: {
          address: {
            mode: 'insensitive',
            contains: input.collectionId,
          },
        },
      });
      // if (!isValidUUID(input.creatorId)) {
      //   throw new Error('Invalid Creator ID. Please try again !');
      // }

      if (!collection) throw new NotFoundException('Collection not found');

      const collectionHasNameNFT =
        await this.validatorService.checkNFTExistence(
          'name',
          'collectionId',
          input.name,
          collection.id,
        );

      if (collectionHasNameNFT) {
        throw new Error('The name of the NFT already exists in Collection');
      }

      if (checkExist) {
        throw new Error('Transaction hash or ID already exists');
      }

      const nft = await this.prisma.nFT.create({
        data: {
          u2uId: input.u2uId,
          id: input.id,
          name: input.name,
          image: input.image,
          status: TX_STATUS.PENDING,
          tokenUri: input.tokenUri,
          txCreationHash: input.txCreationHash,
          creatorId: user.id,
          collectionId: collection.id,
          animationUrl: input.animationUrl,
        },
        include: {
          traits: true,
          collection: true,
        },
      });
      await this.prisma.userNFT.create({
        data: {
          userId: user.id,
          nftId: input.id,
          collectionId: collection.id,
        },
      });
      await Redis.publish('nft-channel', {
        data: {
          txCreation: nft.txCreationHash,
          type: nft.collection.type,
        },
        process: 'nft-create',
      });
      await Redis.publish('ipfs', {
        data: {
          collectionAddress: collection.address,
          tokenId: nft.id,
          ipfsUrl: nft.tokenUri.replace('ipfs://', ''),
        },
        process: 'get-ipfs',
      });
      return nft;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(filter: GetAllNftDto): Promise<PagingResponse<NftDto>> {
    // TODO: Reimplement pagination strategy
    // Get the result totally from subgraph and match data to local storage
    // For each set of condition, use different subgraph query as source
    // owner: getNFTFromOwner
    // owner + sellStatus + priceMax + priceMin + collectionType: marketplace721S and marketplace1155S
    try {
      let traitsConditions = [];

      // TODO: if price and status are included, then use subgraph as main source and use other to eliminate
      if (filter.traits) {
        traitsConditions = filter.traits.map((trait) => ({
          traits: {
            some: {
              trait_type: trait.trait_type,
              ...(trait.value && { value: trait.value }),
              ...(trait.display_type && { display_type: trait.display_type }),
            },
          },
        }));
      }
      let nftIdFromOwner = [];
      let nftCollectionFromOwner = [];
      if (filter.owner) {
        const { account } = await this.GraphqlService.getNFTFromOwner(
          filter.owner.toLocaleLowerCase(),
        );
        nftIdFromOwner = account.ERC721tokens.map(
          (item) => item.tokenId,
        ).concat(account.ERC1155balances.map((item) => item.token.tokenId));

        nftCollectionFromOwner = account.ERC721tokens.map(
          (item) => item.contract.id,
        ).concat(account.ERC1155balances.map((item) => item.token.contract.id));
      }

      const whereCondition: Prisma.NFTWhereInput = {};
      const whereConditionInternal: Prisma.NFTWhereInput = {};
      whereConditionInternal.AND = [];
      whereCondition.OR = [];

      // Handle traits conditions
      if (traitsConditions.length > 0) {
        whereConditionInternal.AND.push(...traitsConditions);
      }

      whereConditionInternal.AND.push({
        status: TX_STATUS.SUCCESS,
      });

      if (filter.creatorAddress) {
        whereConditionInternal.AND.push({
          creator: {
            publicKey: filter.creatorAddress,
          },
        });
      }

      if (filter.collectionAddress || filter.type) {
        const collectionCondition: Prisma.CollectionWhereInput = {};

        if (filter.collectionAddress) {
          collectionCondition.address = filter.collectionAddress;
        }

        if (filter.type) {
          collectionCondition.type = filter.type;
        }

        whereConditionInternal.AND.push({ collection: collectionCondition });
      }

      if (filter.name) {
        whereConditionInternal.AND.push({
          // name: {
          //   contains: filter.name,
          //   mode: 'insensitive',
          // },
          nameSlug: {
            contains: OtherCommon.stringToSlugSearch(filter.name),
            mode: 'insensitive',
          },
        });
      }

      if (nftIdFromOwner.length > 0) {
        const collectionToTokenIds: Record<string, string[]> = {};
        for (let i = 0; i < nftIdFromOwner.length; i++) {
          const collection = nftCollectionFromOwner[i];
          if (!collectionToTokenIds[collection]) {
            collectionToTokenIds[collection] = [];
          }
          collectionToTokenIds[collection].push(nftIdFromOwner[i]);

          // whereCondition.OR.push({
          //   AND: [
          //     { OR: [{ u2uId: nftIdFromOwner[i] }, { id: nftIdFromOwner[i] }] },
          //     {
          //       collection: {
          //         address: nftCollectionFromOwner[i],
          //       },
          //     },
          //     ...whereConditionInternal.AND,
          //   ],
          // });
        }
        for (const [collection, tokenIds] of Object.entries(
          collectionToTokenIds,
        )) {
          const tokenIdConditions = tokenIds.map((tokenId) => ({
            OR: [{ u2uId: tokenId }, { id: tokenId }],
          }));

          whereCondition.OR.push({
            AND: [
              { OR: tokenIdConditions },
              {
                collection: {
                  address: collection,
                },
              },
              ...whereConditionInternal.AND,
            ],
          });
        }
      } else if (filter.owner) {
        // console.log(whereConditionInternal);
      } else {
        whereCondition.AND = whereConditionInternal.AND;
        delete whereCondition.OR;
      }

      //----------

      if (!filter.priceMin && !filter.priceMax && !filter.sellStatus) {
        const nfts = await this.prisma.nFT.findMany({
          skip: (filter.page - 1) * filter.limit,
          take: filter.limit,
          // where: whereCondition.OR.length > 0 || whereConditionInternal.AND.length > 0 ? whereCondition : { AND: [] },
          where: whereCondition,
          orderBy: {
            createdAt: filter.order,
          },
          include: {
            creator: {
              select: creatorSelect,
            },
            collection: {
              select: {
                id: true,
                txCreationHash: true,
                name: true,
                status: true,
                type: true,
                address: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            traits: true,
          },
        });
        const mergedArray = await Promise.all(
          nfts.map(async (item) => {
            const { marketEvent1155S, marketEvent721S } =
              await this.GraphqlService.getNFTSellStatus1({
                and: [
                  {
                    address: item.collection.address,
                    nftId_: {
                      tokenId: item.u2uId || item.id,
                    },
                  },
                ],
              });
            const foundItem1 = marketEvent721S.find(
              (obj) =>
                obj.nftId &&
                (obj.nftId.tokenId === item.u2uId ||
                  obj.nftId.tokenId === item.id) &&
                obj.nftId.contract.id === item.collection.address,
            );
            const foundItem2 = marketEvent1155S.find(
              (obj) =>
                obj.nftId &&
                (obj.nftId.tokenId === item.u2uId ||
                  obj.nftId.tokenId === item.id) &&
                obj.nftId.contract.id === item.collection.address,
            );
            return {
              ...item,
              ...(foundItem1 && {
                price: foundItem1.price,
                sellStatus: foundItem1.event,
                quantity: 1,
                quoteToken: foundItem1.quoteToken,
              }),
              ...(foundItem2 && {
                price: foundItem2.price,
                sellStatus: foundItem2.event,
                quantity: foundItem2.quantity,
                askId: foundItem2.id,
                quoteToken: foundItem2.quoteToken,
              }),
            };
          }),
        );
        const total = await this.prisma.nFT.count({
          where: whereCondition,
        });
        return {
          data: mergedArray,
          paging: {
            total,
            limit: filter.limit,
            page: filter.page,
          },
        };
      } else {
        if (Number(filter.priceMin) > Number(filter.priceMax)) {
          // If priceMin is higher than priceMax, return an empty array
          return {
            data: [],
            paging: {
              total: 0,
              limit: filter.limit,
              page: filter.page,
            },
          };
        }
        const { marketEvent1155S, marketEvent721S } =
          await this.GraphqlService.getNFTSellStatus1(
            {
              and: [
                { price_gte: filter.priceMin },
                { price_lte: filter.priceMax },
                { event: filter.sellStatus },
                { quoteToken: filter.quoteToken },
                {
                  from:
                    filter.sellStatus === SellStatus.AskNew && filter.owner
                      ? filter.owner.toLowerCase()
                      : filter.from,
                },
              ],
            },
            filter.page,
            filter.limit,
          );
        const marketEvents = marketEvent1155S
          // @ts-ignore
          .concat(marketEvent721S)
          .filter((i) => !!i.nftId)
          .map((pair) => ({
            AND: [
              { collection: { address: pair.nftId.contract.id } },
              // { OR: u2uId: pair.nftId.tokenId },
              {
                OR: [{ u2uId: pair.nftId.tokenId }, { id: pair.nftId.tokenId }],
              },
            ],
          }));

        const whereCondition1: Prisma.NFTWhereInput =
          marketEvents.length > 0
            ? { AND: [{ OR: marketEvents }, whereCondition] }
            : { AND: [{ id: '' }, whereCondition] };

        const nfts = await this.prisma.nFT.findMany({
          // skip: (filter.page - 1) * filter.limit,
          // take: filter.limit,
          where: whereCondition1,
          orderBy: {
            createdAt: filter.order,
          },
          include: {
            creator: {
              select: creatorSelect,
            },
            collection: {
              select: {
                id: true,
                txCreationHash: true,
                name: true,
                status: true,
                type: true,
                address: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            traits: true,
          },
        });
        const mergedArray = nfts.map((item) => {
          const foundItem1 = marketEvent721S.find(
            (obj) =>
              obj.nftId &&
              (obj.nftId.tokenId === item.u2uId ||
                obj.nftId.tokenId === item.id) &&
              obj.nftId.contract.id === item.collection.address,
          );
          const foundItem2 = marketEvent1155S.find(
            (obj) =>
              obj.nftId &&
              (obj.nftId.tokenId === item.u2uId ||
                obj.nftId.tokenId === item.id) &&
              obj.nftId.contract.id === item.collection.address,
          );
          return {
            ...item,
            ...(foundItem1 && {
              price: foundItem1.price,
              sellStatus: foundItem1.event,
              quantity: 1,
              quoteToken: foundItem1.quoteToken,
            }),
            ...(foundItem2 && {
              price: foundItem2.price,
              sellStatus: foundItem2.event,
              quantity: foundItem2.quantity,
              askId: foundItem2.id,
              quoteToken: foundItem2.quoteToken,
            }),
          };
        });
        const total = await this.prisma.nFT.count({
          where: whereCondition1,
        });
        return {
          data: mergedArray,
          paging: {
            total: 999999,
            limit: filter.limit,
            page: filter.page,
          },
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getNftDetailTransactionInfo(
    nftId: string,
    collectionAddress: string,
    page,
    limit,
  ) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        address: collectionAddress.toLowerCase(),
      },
    });
    if (!collection) {
      throw new NotFoundException('No collection was found');
    }
    const nft: NftEntity = await this.prisma.nFT.findUnique({
      where: {
        id_collectionId: {
          id: nftId,
          collectionId: collection.id,
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            avatar: true,
            username: true,
            publicKey: true,
          },
        },
        collection: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        traits: true,
      },
    });
    const { owners, totalSupply } = await this.getCurrentOwners(nft);
    const sellInfo = await this.eventService.findEvents({
      contractAddress: nft.collection.address,
      nftId: nft.u2uId ? nft.u2uId : nft.id,
      event: SellStatus.AskNew,
      type: nft.collection.type,
      page: 0,
      limit: owners.length > 0 ? owners.length : 1,
    });

    const bidInfo = await this.eventService.findEvents({
      contractAddress: nft.collection.address,
      nftId: nft.u2uId ? nft.u2uId : nft.id,
      event: SellStatus.Bid,
      type: nft.collection.type,
      page: (page - 1) * limit,
      limit: limit,
    });

    const bidderAddress = bidInfo.map((bidder) => bidder.to);

    const bidderInfo = await this.prisma.user.findMany({
      where: {
        signer: {
          in: bidderAddress,
        },
      },
      select: {
        signer: true,
        publicKey: true,
        id: true,
        username: true,
        avatar: true,
        email: true,
      },
    });

    const sellerAddress = bidInfo.concat(sellInfo).map((seller) => seller.from);

    const sellerInfo = await this.prisma.user.findMany({
      where: {
        signer: {
          in: sellerAddress.filter((i) => i !== null),
        },
      },
      select: {
        signer: true,
        publicKey: true,
        id: true,
        username: true,
        avatar: true,
        email: true,
      },
    });

    const mergedBidder = bidInfo.map((item) => {
      const match = bidderInfo.find((item1) => item1.signer == item.to);
      return match ? { ...item, to: match as OwnerOutputDto } : item;
    });

    const mergedSeller = sellInfo.map((item) => {
      const match = sellerInfo.find((item1) => item1.signer == item.from);
      return match ? { ...item, from: match as OwnerOutputDto } : item;
    });
    return {
      bidInfo: mergedBidder,
      sellInfo: mergedSeller,
      owners,
      totalSupply,
    };
  }

  async getCurrentOwners(
    nft: NftEntity,
  ): Promise<{ owners: OwnerOutputDto[]; totalSupply: number }> {
    let owners: OwnerOutputDto[] = [];
    let nftInfoWithOwner;
    let totalSupply = 0;
    if (nft.collection.type === 'ERC1155') {
      nftInfoWithOwner = await this.GraphqlService.getOneNFTOwnersInfo1155(
        nft.collection.address,
        nft.u2uId ? nft.u2uId : nft.id,
      );
      const totalSupplyFilter = nftInfoWithOwner.erc1155Balances.filter(
        (i) => i.value > 0 && !i.account,
      );
      totalSupply = totalSupplyFilter[0].value;
      const ownerAddresses = nftInfoWithOwner.erc1155Balances
        .map((i) => {
          if (i.account && i.account.id !== ZERO_ADDR && i.value > 0)
            return i.account.id;
        })
        .filter((i) => !!i);
      const ownersFromLocal = await this.prisma.user.findMany({
        where: {
          signer: { in: ownerAddresses },
        },
        select: creatorSelect,
      });
      owners = ownersFromLocal.map((item2) => {
        const item1 = nftInfoWithOwner.erc1155Balances.find(
          (i1) => i1.account && i1.account.id === item2.signer,
        );
        if (item1) {
          return {
            ...item2,
            quantity: item1.value,
          };
        }
        return item2;
      });
    } else {
      nftInfoWithOwner = await this.GraphqlService.getOneNFTOwnersInfo721(
        nft.collection.address,
        nft.u2uId ? nft.u2uId : nft.id,
      );
      totalSupply = 1;
      owners = await this.prisma.user.findMany({
        where: {
          signer: nftInfoWithOwner.erc721Tokens[0].owner.id,
        },
        select: creatorSelect,
      });
    }
    if (owners.length === 0) {
      return {
        // @ts-ignore
        owners: [{ signer: nftInfoWithOwner.erc721Tokens[0].owner.id }],
        totalSupply,
      };
    } else {
      return { owners, totalSupply };
    }
  }

  async findOne(id: string, collectionAddress: string): Promise<NftDto> {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          address: collectionAddress.toLowerCase(),
        },
      });

      if (!collection) {
        throw new NotFoundException('No collection was found');
      }

      const nftCondition: Prisma.NFTWhereInput = {};
      nftCondition.OR = [];

      const nftOrConditionId: Prisma.NFTWhereInput = {
        AND: [{ id, collectionId: collection.id }],
      };
      const nftOrConditionu2uId: Prisma.NFTWhereInput = {
        AND: [{ u2uId: id, collectionId: collection.id }],
      };

      nftCondition.OR.push(nftOrConditionId, nftOrConditionu2uId);

      const nft: NftEntity = await this.prisma.nFT.findFirst({
        where: nftCondition,
        include: {
          creator: {
            select: creatorSelect,
          },
          collection: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          traits: true,
        },
      });
      if (!nft) {
        throw new NotFoundException('No NFT found');
      }
      let owners: OwnerOutputDto[];
      if (nft.collection.type === 'ERC1155') {
        // const ownerAndSupplyInfo = await this.getCurrentOwners(nft);
        // owners = ownerAndSupplyInfo.owners;
        // nft.totalSupply = ownerAndSupplyInfo.totalSupply;
      } else {
        // const ownerAndSupplyInfo = await this.getCurrentOwners(nft);
        // owners = ownerAndSupplyInfo.owners;
      }
      // @ts-ignore
      nft.owners = owners;
      // const sellInfo = await this.eventService.findEvents({
      //   contractAddress: nft.collection.address,
      //   nftId: nft.u2uId ? nft.u2uId : nft.id,
      //   event: SellStatus.AskNew,
      //   type: nft.collection.type,
      //   page: 0,
      //   limit: owners.length > 0 ? owners.length : 1,
      // });

      // const bidInfo = await this.eventService.findEvents({
      //   contractAddress: nft.collection.address,
      //   nftId: nft.u2uId ? nft.u2uId : nft.id,
      //   event: SellStatus.Bid,
      //   type: nft.collection.type,
      //   page: (bidPage - 1) * bidListLimit,
      //   limit: bidListLimit,
      // });
      const royalties =
        await this.collectionPriceService.FetchRoyaltiesFromGraph(
          collectionAddress,
        );
      const totalRoyalties = royalties.reduce(
        (acc, item) => acc + item.value,
        0,
      );
      const returnNft: NftDto = {
        ...nft,
        collection: {
          ...nft.collection,
          totalRoyalties,
          listRoyalties: royalties,
        },
        // sellInfo: sellInfo,
        // bidInfo: bidInfo,
      };
      return returnNft;
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findNFTByUserID(id: string): Promise<any[]> {
    try {
      if (!isValidUUID(id)) {
        throw new Error('Invalid User. Please try again !');
      }
      const checkExist = await this.prisma.user.findFirst({
        where: { id: id },
      });
      if (!checkExist) {
        throw new NotFoundException();
      }
      return this.prisma.user.findMany({
        where: {
          id: id,
        },
        include: {
          nftsOwnership: {
            select: {
              quantity: true,
              nft: {
                select: {
                  id: true,
                  name: true,
                  traits: true,
                  createdAt: true,
                  updatedAt: true,
                  status: true,
                  tokenUri: true,
                  txCreationHash: true,
                  creator: {
                    select: creatorSelect,
                  },
                  collection: {
                    select: {
                      id: true,
                      txCreationHash: true,
                      name: true,
                      status: true,
                      type: true,
                      category: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findActivityNFT(input: GetActivityBase) {
    try {
      const { tokenId, quoteToken, collectionAddress, page, limit, type } =
        input;

      const and = [{ tokenId }, { quoteToken }, { address: collectionAddress }];
      const blocks = await this.activityService.fetchActivityFromGraph({
        and,
        page,
        limit,
        type,
      });

      const result = await this.activityService.processActivityNFTData(blocks);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  getUserData = async (signer: string) => {
    try {
      return await this.prisma.user.findFirst({
        where: { signer },
        select: {
          id: true,
          email: true,
          avatar: true,
          username: true,
          signer: true,
        },
      });
    } catch (error) {
      console.error(`Error fetching user data for signer ${signer}:`, error);
      throw error; // You may want to handle or log the error accordingly
    }
  };
}
