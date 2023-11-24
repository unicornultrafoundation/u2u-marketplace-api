import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Prisma, TX_STATUS, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { NftDto } from './dto/nft.dto';
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { validate as isValidUUID } from 'uuid';
import { Redis } from 'src/database';
import { GetAllNftDto } from './dto/get-all-nft.dto';
import { GraphQlcallerService } from '../graph-qlcaller/graph-qlcaller.service';
import { SellStatus } from 'src/generated/graphql';

@Injectable()
export class NftService {
  constructor(private prisma: PrismaService, private readonly GraphqlService: GraphQlcallerService) { }
  async create(input: CreateNftDto, user: User): Promise<NftDto> {
    try {
      let checkExist = await this.prisma.nFT.findFirst({
        where: {
          OR: [
            { txCreationHash: input.txCreationHash },
            { name: input.name },
            { id: input.id }
          ]
        }
      });

      let collection = await this.prisma.collection.findFirst({
        where: {
          address: {
            mode: 'insensitive',
            contains: input.collectionId
          }
        }
      })
      // if (!isValidUUID(input.creatorId)) {
      //   throw new Error('Invalid Creator ID. Please try again !');
      // }

      if (!collection)
        throw new NotFoundException('Collection not found');

      if (!isValidUUID(input.collectionId)) {
        throw new Error('Invalid Collection ID. Please try again !');
      }

      if (checkExist) {
        throw new Error('Transaction hash or name or ID already exists')
      }

      let nft = await this.prisma.nFT.create({
        data: {
          id: input.id,
          name: input.name,
          ipfsHash: input.name,
          imageHash: input.imageHash,
          traits: {
            create: input.traits,
          },
          status: TX_STATUS.PENDING,
          tokenUri: input.tokenUri,
          txCreationHash: input.txCreationHash,
          creatorId: user.id,
          collectionId: collection.id
        },
        include: {
          traits: true,
          collection: true,
        }
      });
      await this.prisma.userNFT.create({
        data: {
          userId: user.id,
          nftId: input.id,
        }
      })
      await Redis.publish('nft-channel', JSON.stringify({ txCreation: nft.txCreationHash, type: nft.collection.type }))
      return nft;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(filter: GetAllNftDto): Promise<PagingResponse<NftDto>> {
    try {
      let traitsConditions = [];
      
      // TODO: if price and status are included, then use subgraph as main source and use other to eliminate 
      
      if (filter.traits) {
        traitsConditions = filter.traits.map(trait => ({
          traits: {
            some: {
              trait_type: trait.trait_type,
              ...(trait.value && { value: trait.value }),
              ...(trait.display_type && { display_type: trait.display_type }),
            },
          },
        }));
      }
      let whereCondition: Prisma.NFTWhereInput = {
        AND: traitsConditions,
        ...(filter.creatorAddress && { creator: {
          publicKey: filter.creatorAddress
        }}),
        ...(filter.collectionAddress && { collection: {
          address: filter.collectionAddress
        }}),
        ...(filter.name && { name: filter.name})
      }
      // TODO: add first / skip to these 2 for pagination
      const { marketEvent721S } = await this.GraphqlService.getNFTsHistory721(filter.priceMin,filter.priceMax, filter.sellStatus);
      const { marketEvent1155S } = await this.GraphqlService.getNFTsHistory1155(filter.priceMin,filter.priceMax, filter.sellStatus);
      if (!filter.priceMin && !filter.priceMax && !filter.sellStatus) {
      const nfts = await this.prisma.nFT.findMany({
        skip: (filter.page - 1) * filter.limit,
        take: filter.limit,
        where: whereCondition,
        include: {
          creator: {
              select: {
                id: true,
                email: true,
                avatar: true,
                username: true,
                publicKey: true,
              }
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
                    name: true
                  }
                }
              }
            },
            traits: true,
          }
        })
        const mergedArray = nfts.map(item => {
          const foundItem1 = marketEvent721S.find(obj => obj.nftId.id === item.id);
          const foundItem2 = marketEvent1155S.find(obj => obj.nftId.id === item.id)
          return {
            ...item,
            ...(foundItem1 && { price: foundItem1.price, sellStatus: foundItem1.event }),
            ...(foundItem2 && { price: foundItem2.price, sellStatus: foundItem2.event }),
          };          
        });
        const total = await this.prisma.nFT.count({
          where: whereCondition,
        });
        return {
          data: mergedArray,
          paging: {
            total,
            limit: filter.limit,
            page: filter.page,
          }
        };
      } else {
        whereCondition = {...whereCondition, id: {
          in: marketEvent721S.map(item => item.nftId.id).concat(marketEvent1155S.map(item => item.nftId.id))
        }}
        const nfts = await this.prisma.nFT.findMany({
          skip: (filter.page - 1) * filter.limit,
          take: filter.limit,
          where: whereCondition,
          include: {
            creator: {
                select: {
                  id: true,
                  email: true,
                  avatar: true,
                  username: true,
                  publicKey: true,
                }
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
                      name: true
                    }
                  }
                }
              },
              traits: true,
            }
          })

          const mergedArray = nfts.map(item => {
            const foundItem1 = marketEvent721S.find(obj => obj.nftId.id === item.id);
            const foundItem2 = marketEvent1155S.find(obj => obj.nftId.id === item.id)
            return {
              ...item,
              ...(foundItem1 && { price: foundItem1.price, sellStatus: foundItem1.event }),
              ...(foundItem2 && { price: foundItem2.price, sellStatus: foundItem2.event }),
            };          
          });
          const total = await this.prisma.nFT.count({
            where: whereCondition,
          });
          return {
            data: mergedArray,
            paging: {
              total,
              limit: filter.limit,
              page: filter.page,
            }
          };
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findOne(id: string): Promise<NftDto> {
    try {
      let checkExist = await this.prisma.nFT.findFirst({ where: { id: id } });
      if (!checkExist) {
        throw new NotFoundException()
      }
      const nft = await this.prisma.nFT.findUnique({
        where: {
          id: id
        },
        include: {
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
                }
              }
            }
          },
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
            select: {
              id: true,
              txCreationHash: true,
              name: true,
              status: true,
              type: true,
              category: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          traits: true,
        }
      })
      if (!nft) {
        throw new NotFoundException('No NFT found');
      }
      const sellInfo = await this.GraphqlService.getOneNFTSellStatus(id);
      const returnNft: NftDto = {...nft, sellInfo }
      return returnNft;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findNFTByUserID(id: string): Promise<any[]> {
    try {
      if (!isValidUUID(id)) {
        throw new Error('Invalid User. Please try again !');
      }
      let checkExist = await this.prisma.user.findFirst({ where: { id: id } });
      if (!checkExist) {
        throw new NotFoundException()
      }
      return this.prisma.user.findMany({
        where: {
          id: id
        },
        include: {
          nftsOwnership: {
            select: {
              quantity: true,
              nft: {
                select: {
                  id: true,
                  name: true,
                  ipfsHash: true,
                  traits: true,
                  createdAt: true,
                  updatedAt: true,
                  status: true,
                  tokenUri: true,
                  txCreationHash: true,
                  creator: {
                    select: {
                      id: true,
                      email: true,
                      avatar: true,
                      username: true,
                      signer: true,
                      publicKey: true,
                    },
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
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateNftDto: UpdateNftDto) {
    return `This action updates a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
