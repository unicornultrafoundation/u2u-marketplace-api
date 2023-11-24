import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionEntity } from './entities/collection.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CONTRACT_TYPE, Collection, Prisma, TX_STATUS, User } from '@prisma/client'
import { validate as isValidUUID } from 'uuid'
import { Redis } from 'src/database';
import { TraitService } from '../nft/trait.service';
import { GetAllCollectionDto } from './dto/get-all-collection.dto';
import { GetCollectionMarketData } from '../graph-qlcaller/getCollectionMarketData.service';
import { GraphQlcallerService } from '../graph-qlcaller/graph-qlcaller.service';
import { SellStatus } from 'src/generated/graphql';

interface CollectionGeneral {
  totalOwner: number;
  volumn: string;
  totalNft: number;
  floorPrice: string;
}

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService, private traitService: TraitService, private readonly collectionData: GetCollectionMarketData) { }

  async create(input: CreateCollectionDto, user: User): Promise<any> {
    try {
      let checkExist = await this.prisma.collection.findFirst({
        where: {
          OR: [
            { txCreationHash: input.txCreationHash },
            { symbol: input.symbol },
            { name: input.name }
          ]
        }
      })
      if (checkExist) {
        throw new Error('Transaction hash or name, symbol or already exists')
      } else {
        let collection = await this.prisma.collection.create({
          data: {
            txCreationHash: input.txCreationHash,
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            status: (TX_STATUS.PENDING),
            type: input.type,
            shortUrl: input.shortUrl,
            // categoryId: ...(input.categoryId  Number(input.categoryId),
            ...(input.categoryId && { categoryId: Number(input.categoryId)})
          }
        })

        await this.prisma.userCollection.create({
          data: {
            userId: user.id,
            collectionId: collection.id
          }
        })
        await Redis.publish('collection-channel', JSON.stringify({ txCreation: collection.txCreationHash, type: collection.type }))
        return collection;
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getGeneralCollectionData(collectionAddress: string, type: CONTRACT_TYPE): Promise<CollectionGeneral> {
    const respose = await this.collectionData.getCollectionSumData(collectionAddress)
    const count = await this.collectionData.getCollectionTokens(collectionAddress);
    if (type === 'ERC721') {
      const sum = respose.marketEvent721S.reduce((acc, obj) => acc + BigInt(obj.price), BigInt(0));
      // const count1= await this.collectionData.getCollectionTokens('0x73039bafa89e6f17f9a6b0b953a01af5ecabacd2');
      const uniqueOwnerIdsCount = new Set(count.erc721Tokens.map(obj => obj.owner.id)).size;
      const filterSelling = respose.marketEvent721S.filter(obj => obj.event === "AskNew");
      const floorPrice = filterSelling.length > 0 ? filterSelling.reduce((min, obj) => BigInt(obj.price) < BigInt(min) ? BigInt(obj.price) : BigInt(min), BigInt(filterSelling[0].price)) : BigInt(0);
      return {
        volumn: sum.toString(),
        totalOwner: uniqueOwnerIdsCount,
        totalNft: count.erc721Tokens.length,
        floorPrice: floorPrice.toString()
      }
    } else {
      // const respose = await this.collectionData.getCollectionSumData('0xc2587c1b945b1a7be4be5423c24f1bbf54495daa')
      // count owners
      const owners = await this.collectionData.getCollectionHolder('0xc2587c1b945b1a7be4be5423c24f1bbf54495daa')
      const uniqueOwnerIdsCount = owners.erc1155Balances.filter(obj => BigInt(obj.value) > BigInt(0) && !!obj.account).length;
      // volumn
      const sum = respose.marketEvent1155S.reduce((acc, obj) => acc + BigInt(obj.price), BigInt(0));
      // count total items
      
      // filter floor price
      const filterSelling = respose.marketEvent1155S.filter(obj => obj.event === "AskNew");
      const floorPrice = filterSelling.length > 0 ? filterSelling.reduce((min, obj) => BigInt(obj.price) < BigInt(min) ? BigInt(obj.price) : BigInt(min), BigInt(filterSelling[0].price)) : BigInt(0);
      // filter name
      return {
        volumn: sum.toString(),
        totalOwner: uniqueOwnerIdsCount,
        totalNft: count.erc1155Tokens.length,
        floorPrice: floorPrice.toString()
      }
    }
  }

  async findAll(input: GetAllCollectionDto): Promise<CollectionEntity[]> {
    // TODO: get all collection from subgraph first, got the id and map it back to local collection
    const collections = await this.prisma.collection.findMany({
      where: {
        ...(input.name && { name: {
          contains: input.name,
          mode: 'insensitive'
        }})
      },
      include : {
        creators : {
          select : {
            userId: true,
            user: {
              select: {
                email: true,
                avatar: true,
                username: true,
                publicKey: true,
              },
            },
          }
        }
      }
    })

    const subgraphCollection = collections.map(async (item) => {
      const generalInfo = await this.getGeneralCollectionData(item.address, item.type);
      return { ... item, ...generalInfo}
    })
    const dataArray = Promise.all(subgraphCollection);
    if (input.max || input.min) {
      const filterPriceCollection = (await dataArray).filter(item => {
        const price = item.floorPrice;
        const meetsMinCondition = input.min !== undefined ? price >= input.min : true;
        const meetsMaxCondition = input.max !== undefined ? price <= input.max : true;
        return meetsMinCondition && meetsMaxCondition;
      }) 
      return filterPriceCollection;
    }

    return dataArray;
  }

  async findOne(id: string): Promise<{collection: CollectionEntity, traitAvailable: string[]}> {
    try{
      let whereCondition: Prisma.CollectionWhereInput ;
      if (!isValidUUID(id)) {
        // throw new Error('Invalid ID. Please try again !');
        whereCondition = {
          shortUrl: id
        }
      } else {
        whereCondition = {
          id
        }
      }
      
      const collection = await this.prisma.collection.findFirst({
        where: whereCondition,
        include: {
          category: {
            select: {
              id: true,
              name: true
            },
          },
          creators: {
            select: {
              userId: true,
              user: {
                select: {
                  email: true,
                  avatar: true,
                  username: true,
                  publicKey: true,
                  createdAt: true
                },
              },
            },
          },
          nfts: {
            select: {
              id: true,
              name: true,
              ipfsHash: true,
              createdAt: true,
              status: true,
              tokenUri: true,
              txCreationHash: true,
              creator: {
                select: {
                  id: true,
                  email: true,
                  avatar: true,
                  username: true,
                  publicKey: true,
                  createdAt: true
                },
              },
              owners: {
                select: {
                  userId: true,
                  nftId: true,
                  quantity: true,
                  user: {
                    select: {
                      email: true,
                      avatar: true,
                      username: true,
                      publicKey: true,
                      createdAt: true
                    }
                  }
                }
              }
            }
          }
        }
      })
      if (!collection) {
        throw new NotFoundException()
      }
      const traitsAvailable = await this.traitService.findUniqueTraitsInCollection(collection.id);
      return {collection, traitAvailable: traitsAvailable};
    }catch(error){
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    } 
  }

  async update(id: string, input: UpdateCollectionDto): Promise<any> {
    try {
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again !');
      }
      let checkExist = await this.prisma.collection.findFirst({ where: { id: id } })
      if (!checkExist) {
        throw new NotFoundException()
      }
      return this.prisma.collection.update({
        where: { id: id },
        data: {
          description: input.description,
        }
      })
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: string): Promise<any> {
    try{
      throw new Error('Coming Soon');
      // let checkExist = await this.prisma.collection.findFirst({where : {id : id}})
      // if(!checkExist){
      //   throw new Error('Cannot find Collection. Please try again !');
      // }
      // return this.prisma.collection.delete({
      //   where: {
      //     id: id
      //   }
      // });
    }catch(error){
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findWithUserID(id : string) : Promise<any []>{
    try{
      if (!isValidUUID(id)) {
        throw new Error('Invalid User. Please try again !');
      }
      let checkExist = await this.prisma.user.findFirst({ where: { id: id } });
      if (!checkExist) {
        throw new NotFoundException()
      }
      return this.prisma.user.findMany({
        where : {
          id : id
        },
        include : {
          nftCollection : {
            select : {
              collection : {
                select : {
                  id : true,
                  txCreationHash : true,
                  name : true,
                  address: true,
                  metadata: true,
                  shortUrl: true,
                  symbol : true,
                  description : true,
                  status : true,
                  type : true,
                  categoryId : true,
                  createdAt : true,
                  category : {
                    select : {
                      id : true,
                      name : true,
                    }
                  }
                }
              }
            }
          }
        }
      })

    }catch(error){
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}


