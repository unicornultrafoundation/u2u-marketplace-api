import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionEntity } from './entities/collection.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, TX_STATUS, User } from '@prisma/client'
import { validate as isValidUUID } from 'uuid'
import { Redis } from 'src/database';
import { TraitService } from '../nft/trait.service';


@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService, private traitService: TraitService) { }
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

  async findAll(): Promise<any[]> {
    return this.prisma.collection.findMany({
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


