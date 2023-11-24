import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TX_STATUS } from '@prisma/client';
import { GetAllUser } from './dto/get-all-user.dto';
import { FilterNFTUserDetail } from './dto/get-nft-user.dto';

import { GraphQLClient } from 'graphql-request';
import { getSdk, GetNfTwithAccountIdQueryVariables } from '../../generated/graphql'
import { validate as isValidUUID } from 'uuid'
import { NFTTab } from 'src/constants/enums/NFTTab.enum'
import { SellStatus } from '../../generated/graphql';
import {CollectionService} from '../collection/collection.service';
interface NFT {
  id?: string;
  name?: string;
  ipfsHash?: string;
  // traits?: Traits[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: TX_STATUS;
  tokenUri?: string;
  txCreationHash?: string;
  creatorId?: string;
  collectionId?: string
  creator?: USER
}

interface USER {
  id: string;
  publicKey: string;
  email: string;
  avatar?: string;
  username: string;
  signature?: string;
  signedMessage?: string;
  signer?: string;
  acceptedTerms?: boolean;
  // nftsOwnership? : 
}

interface NFTOwnership {
  quantity: number;
  nft?: NFT;
}

interface ERC721Token {
  id: string;
  uri?: string;
  txCreation: string;
}

interface ERC1155Balance {
  id: string;
  valueExact: string;
  value: string;
}


export interface Result {
  // user : USER;
  // ERC721tokens: (ERC721Token)[];
  // ERC1155balances: ERC1155Balance[];
}




@Injectable()
export class UserServiceExtend { 
  private readonly prisma: PrismaService;
  private readonly collectionService: CollectionService;

  constructor(prisma: PrismaService, collectionService: CollectionService) {
    this.prisma = prisma;
    this.collectionService = collectionService;
  }

  private readonly endpoint = process.env.SUBGRAPH_URL;

  private client = this.getGraphqlClient();

  private readonly allowedEvents = [SellStatus.AskNew, SellStatus.AskCancel, SellStatus.Trade];
  
  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }
  // Remove few prop secret
  private minifyUserObjecct(user: any): any {
    const propertiesToRemove = ['signature', 'signer', 'signedMessage', 'nftsOwnership' , 'nftCreator' , 'nftCollection'];
    const minifiedUser = { ...user };
    for (const property in minifiedUser) {
      if (propertiesToRemove.includes(property)) {
        delete minifiedUser[property];
      }
    }
    return minifiedUser;
  }

  async getNFTByUser(id: string, filter: FilterNFTUserDetail): Promise<any> {
    try {
      const { tab } = filter;
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again !');
      }
      const [userData, NFTList] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id },
          include: {
            nftCreator: tab === NFTTab.CREATOR ? {
              select: {
                id: true,
                name: true,
                ipfsHash: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                tokenUri: true,
                txCreationHash: true,
                collectionId: true,
                traits: {
                  select: {
                    id: true,
                    value: true,
                    display_type: true,
                    trait_type: true
                  }
                },
              }
            } : false
          }
        }),
        this.prisma.nFT.findMany({
          select: {
            id: true,
            name: true,
            ipfsHash: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            tokenUri: true,
            txCreationHash: true,
            collectionId: true,
            traits: {
              select: {
                id: true,
                value: true,
                display_type: true,
                trait_type: true
              }
            },
          }
        })
      ]);

      if (!userData) {
        throw new NotFoundException()
      }
      const { publicKey } = userData;
      const { statusERC721S = [], statusERC1155S = [], ERC721tokens = [], ERC1155balances = [] } = await this.getDataSubgraphNFT(publicKey);
      const {nftCreator = []} = userData;
      const mergedERC721 = this.mergeERCData721(ERC721tokens, NFTList ,statusERC721S, nftCreator, tab);
      const mergedERC1155 = this.mergeERCData1155(ERC1155balances, NFTList, statusERC1155S, nftCreator,tab);
      return [...mergedERC721 , ...mergedERC1155]
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getDataSubgraphNFT(publicKey: string): Promise<{ ERC721tokens: any[]; ERC1155balances: any[]; statusERC721S: any[]; statusERC1155S: any[] }> {
    const sdk = getSdk(this.client);
    const { account } = await sdk.getNFTwithAccountID({ id: publicKey });
    const { marketEvent721S: statusERC721S = [] } = await sdk.getStatusERC721S();
    const { marketEvent1155S: statusERC1155S = [] } = await sdk.getStatusERC1155S();
    return { ERC721tokens: account?.ERC721tokens || [], ERC1155balances: account?.ERC1155balances || [], statusERC721S, statusERC1155S };
  }

  mergeERCData1155(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTTab): any[] {
    const mergeNFTAndStatus = (token: any, nftList: NFT[], statusList: any[]) => {
      const tokenId = token?.token?.id || token.id;
      const matchingNFT = (nftList.find(nft => nft.id === tokenId) || {});
      const matchingNFTStatus = (statusList.find(status => status?.nftId?.id === tokenId) || {});
      return {
        ...token,
        ...matchingNFTStatus,
        ...matchingNFT,
      };
    };
  
    switch (type) {
      case NFTTab.CREATOR:
        return nftCreator.map(token => mergeNFTAndStatus(token, nftCreator, status));
  
      case NFTTab.ON_SALES:
        const tokenList = tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
        return tokenList.filter(item => this.allowedEvents.includes(item?.event));
  
      default:
        return tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
    }
  }

  mergeERCData721(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTTab): any[] {
    const mergeNFTAndStatus = (token: any, nftList: NFT[], statusList: any[]) => {
      const matchingNFT = (nftList.find(nft => nft.id === token.id) || {});
      const matchingNFTStatus = (statusList.find(status => status?.nftId?.id === token.id) || {});
      return {
        ...token,
        ...matchingNFTStatus,
        ...matchingNFT,
      };
    };
  
    switch (type) {
      case NFTTab.CREATOR:
        return nftCreator.map(token => mergeNFTAndStatus(token, nftCreator, status));
  
      case NFTTab.ON_SALES:
        const tokenList = tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
        return tokenList.filter(item => this.allowedEvents.includes(item?.event));
  
      default:
        return tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
    }
  }

  
  async getCollectionByUser(id: string): Promise<any> {
    try {
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again !');
      }
      const userData = await this.prisma.user.findUnique({
        where: { id: id },
        include: {
          nftCollection: {
            select: {
              collection: {
                select: {
                  id: true,
                  txCreationHash: true,
                  name: true,
                  symbol: true,
                  description: true,
                  status: true,
                  address : true,
                  type: true,
                  categoryId: true,
                  createdAt: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    }
                  }
                }
              }
            }
          }
        }
      })
      if (!userData) {
        throw new NotFoundException();
      }
      let { nftCollection = [] } = userData; 
      const subgraphCollection = await Promise.all(nftCollection.map(async (item) => {
        let {collection} = item;
        const generalInfo = await this.collectionService.getGeneralCollectionData(collection.address, collection.type);
        return { ... collection, ...generalInfo}
      }))
      return subgraphCollection
      // return { ...this.minifyUserObjecct(userData), collections : subgraphCollection };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  // async getCollectionOnChain(): Promise<any[]> {
  //   const sdk = getSdk(this.client);
  //   const { erc721Contracts = [] } = await sdk.getERC721Contracts();
  //   const { erc1155Contracts = [] } = await sdk.getERC1155Contracts();
  //   return [erc721Contracts, erc1155Contracts]
  // }

  // mergeERC721Contracts(dataOnChain: any[], dataOffChain: any[]) {
  //   return dataOffChain.map(off => {
  //     let { collection } = off;
  //     let matchingCollection = (dataOnChain || []).find(on => collection.txCreationHash == on.txCreation);
  //     return matchingCollection ? { ...collection, dataOnChain: matchingCollection } : { ...collection, dataOnChain: {} }
  //   })
  // }

  // mergeERC1155Contracts(dataOnChain: any[], dataOffChain: any[]) {
  //   return dataOffChain.map(off => {
  //     let { collection } = off;
  //     let matchingCollection = (dataOnChain || []).find(on => collection.txCreationHash == on.txCreation);
  //     return matchingCollection ? { ...collection, dataOnChain: matchingCollection } : { ...collection, dataOnChain: {} }
  //   })
  // }
}