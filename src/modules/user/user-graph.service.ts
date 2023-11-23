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
import { NFTType } from 'src/constants/enums/NFTType.enum';
<<<<<<< HEAD
import { SellStatus } from '../../generated/graphql';

=======
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
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
  ERC721tokens: (ERC721Token)[];
  ERC1155balances: ERC1155Balance[];
}




@Injectable()
export class UserServiceExtend { 
  constructor(private readonly prisma: PrismaService) { }
  private readonly endpoint = process.env.SUBGRAPH_URL;
  
  private client = this.getGraphqlClient();

  private readonly allowedEvents = [SellStatus.AskNew, SellStatus.Bid, SellStatus.AcceptBid];
  
  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }
  // Remove few prop secret
  private minifyUserObjecct(user: any): any {
    const propertiesToRemove = ['signature', 'signer', 'signedMessage', 'nftsOwnership' , 'nftCreator'];
    const minifiedUser = { ...user };
    for (const property in minifiedUser) {
      if (propertiesToRemove.includes(property)) {
        delete minifiedUser[property];
      }
    }
    return minifiedUser;
  }

  async getNFTByUser(id: string, filter: FilterNFTUserDetail): Promise<Result> {
    try {
      const { type } = filter;
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again !');
      }
      const [userData, NFTList] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id },
          include: {
            nftCreator: type === NFTType.CREATOR ? {
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
<<<<<<< HEAD
          s          value: true,
=======
                    value: true,
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
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
      const { statusERC721S = [], statusERC1155S = [], ERC721tokens = [], ERC1155balances = [] } = await this.getOnChainDataNFT(publicKey);
      const {nftCreator = []} = userData;
<<<<<<< HEAD
      const mergedERC721 = this.mergeERCData721(ERC721tokens, NFTList ,statusERC721S, nftCreator, type);
      const mergedERC1155 = this.mergeERCData1155(ERC1155balances, NFTList, statusERC1155S, nftCreator,type);
=======
      const mergedERC721 = this.mergeERCData(ERC721tokens, NFTList ,statusERC721S, nftCreator, type);
      const mergedERC1155 = this.mergeERCData(ERC1155balances, NFTList, statusERC1155S, nftCreator,type);
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
      return { ...this.minifyUserObjecct(userData), ERC721tokens: mergedERC721, ERC1155balances: mergedERC1155 };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getOnChainDataNFT(publicKey: string): Promise<{ ERC721tokens: any[]; ERC1155balances: any[]; statusERC721S: any[]; statusERC1155S: any[] }> {
    const sdk = getSdk(this.client);
    const { account } = await sdk.getNFTwithAccountID({ id: publicKey });
    const { marketEvent721S: statusERC721S = [] } = await sdk.getStatusERC721S();
    const { marketEvent1155S: statusERC1155S = [] } = await sdk.getStatusERC1155S();
    return { ERC721tokens: account?.ERC721tokens || [], ERC1155balances: account?.ERC1155balances || [], statusERC721S, statusERC1155S };
  }

<<<<<<< HEAD
  mergeERCData1155(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTType): any[] {
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
      case NFTType.CREATOR:
        return nftCreator.map(token => mergeNFTAndStatus(token, nftCreator, status));
  
      case NFTType.ON_SALES:
        const tokenList = tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
        return tokenList.filter(item => this.allowedEvents.includes(item?.event));
  
      default:
        return tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
    }
  }

  mergeERCData721(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTType): any[] {
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
      case NFTType.CREATOR:
        return nftCreator.map(token => mergeNFTAndStatus(token, nftCreator, status));
  
      case NFTType.ON_SALES:
        const tokenList = tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
        return tokenList.filter(item => this.allowedEvents.includes(item?.event));
  
      default:
        return tokens.map(token => mergeNFTAndStatus(token, NFTList, status));
    }
  }

=======
   mergeERCData(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTType): any[] {
    const mapFunction = type === NFTType.CREATOR ? nftCreator : tokens;
    return mapFunction.map(token => {
      const matchingNFT = type === NFTType.CREATOR ? {} : NFTList.find(nft => nft.id === token.id);
      const matchingNFTStatus = (status.find(status => status?.nftId?.id === token.id) || {});
      return {
        ...matchingNFT,
        ...matchingNFTStatus,
        ...token,
      };
    });
  }
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
  
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
      let { nftCollection: nftCollecionOffChain = [] } = (userData || {});
      let [erc721Contracts, erc1155Contracts] = await this.getCollectionOnChain();

      let nftCollection721 = await this.mergeERC721Contracts(erc721Contracts, nftCollecionOffChain);
      let nftCollection1155 = await this.mergeERC1155Contracts(erc1155Contracts, nftCollecionOffChain);

      delete userData.nftCollection;
      return { ...userData, erc721Contracts: nftCollection721, erc1155Contracts: nftCollection1155 };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  async getCollectionOnChain(): Promise<any[]> {
    const sdk = getSdk(this.client);
    const { erc721Contracts = [] } = await sdk.getERC721Contracts();
    const { erc1155Contracts = [] } = await sdk.getERC1155Contracts();
    return [erc721Contracts, erc1155Contracts]
  }

  mergeERC721Contracts(dataOnChain: any[], dataOffChain: any[]) {
    return dataOffChain.map(off => {
      let { collection } = off;
      let matchingCollection = (dataOnChain || []).find(on => collection.txCreationHash == on.txCreation);
      return matchingCollection ? { ...collection, dataOnChain: matchingCollection } : { ...collection, dataOnChain: {} }
    })
  }

  mergeERC1155Contracts(dataOnChain: any[], dataOffChain: any[]) {
    return dataOffChain.map(off => {
      let { collection } = off;
      let matchingCollection = (dataOnChain || []).find(on => collection.txCreationHash == on.txCreation);
      return matchingCollection ? { ...collection, dataOnChain: matchingCollection } : { ...collection, dataOnChain: {} }
    })
  }
}



    // return nftsOwnership.map((nft) => {
    //   const matchingNFT = tokens.find((token) => nft?.nft?.id === token.id);
    //   const matchingNFTStatus = (status.find((token) => nft?.nft?.id === token?.nftId?.id) || {});
    //   delete matchingNFTStatus.nftId;
    //   return matchingNFT ? { value: (nft?.quantity || 0), ...nft?.nft, status: (matchingNFTStatus?.event ? matchingNFTStatus?.event : nft?.nft?.status) } : { ...nft?.nft }
    // });
    // return nftsOwnership.map((nft) => {
    //   const matchingNFT = tokens.find((token) => nft?.nft?.id === token?.token?.id);
    //   const matchingNFTStatus = (status.find((token) => nft?.nft?.id === token?.nftId?.id) || {});
    //   delete matchingNFTStatus.nftId;
    //   return matchingNFT ? { value: (matchingNFT?.valueExact || 0), ...nft?.nft, status: (matchingNFTStatus?.event ? matchingNFTStatus?.event : nft?.nft?.status) } : { ...nft?.nft }
<<<<<<< HEAD
    // });

    //  mergeERCData(tokens: any[], NFTList: NFT[], status: any[], nftCreator: any[], type: NFTType): any[] {
    //   const mapFunction = type === NFTType.CREATOR ? nftCreator : tokens;
    //   return mapFunction.map(token => {
    //     const matchingNFT = type === NFTType.CREATOR ? {} : NFTList.find(nft => nft.id === token.id);
    //     const matchingNFTStatus = (status.find(status => status?.nftId?.id === token.id) || {});
    //     return {
    //       ...matchingNFT,
    //       ...matchingNFTStatus,
    //       ...token,
    //     };
    //   });
    // }

        // return type === NFTType.CREATOR ?    
    // nftCreator.map(token =>{
    //   const matchingNFTStatus = (status.find((status) => status?.nftId?.id == token.id) || {});
    //   return {
    //     ...token,
    //     ...matchingNFTStatus,
    //   };
    // })
    // :
    //  tokens.map(token => {
    //   const matchingNFT = (NFTList.find(nft => nft.id == token.id) || {});
    //   const matchingNFTStatus = (status.find((status) => status?.nftId?.id == token.id) || {});
    //   return {
    //     ...token,
    //     ...matchingNFTStatus,
    //     ...matchingNFT,
    //   };
    // })s
=======
    // });
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
