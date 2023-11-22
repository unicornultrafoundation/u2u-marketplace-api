import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TX_STATUS } from '@prisma/client';
import { GetAllUser } from './dto/get-all-user.dto';
import { GraphQLClient } from 'graphql-request';
import { getSdk, GetNfTwithAccountIdQueryVariables } from '../../generated/graphql'
import { validate as isValidUUID } from 'uuid'
interface NFT {
  id: string;
  name: string;
  ipfsHash: string;
  traits: string;
  createdAt: Date;
  updatedAt: Date;
  status: TX_STATUS;
  tokenUri: string;
  txCreationHash: string;
  creatorId: string;
  collectionId: string
  creator?: USER
}


interface USER {
  id: string;
  publicKey: string;
  email: string;
  avatar?: string;
  username: string;
  signature: string;
  signedMessage?: string;
  signer: string;
  acceptedTerms: boolean;
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

  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }

  async getNFTByUser(id: string): Promise<Result> {
    try {
      if (!isValidUUID(id)) {
        throw new Error('Invalid ID. Please try again !');
      }

      const [userData] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id },
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
                    collectionId: true,
                    creatorId: true,
                    creator: {
                      select: {
                        id: true,
                        email: true,
                        avatar: true,
                        username: true,
                        signature: true,
                        signer: true,
                        publicKey: true,
                        acceptedTerms: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }),
      ]);

      if (!userData) {
        throw new NotFoundException()
      }
      const { publicKey } = userData;
      const { statusERC721S = [], statusERC1155S = [], ERC721tokens = [], ERC1155balances = [] } = await this.getOnChainData(publicKey);
      let { nftsOwnership = [] } = (userData || {});

      const mergedERC721 = this.mergeERCData721(ERC721tokens, nftsOwnership, statusERC721S);
      const mergedERC1155 = this.mergeERCData1155(ERC1155balances, nftsOwnership, statusERC1155S);
      delete userData.nftsOwnership;
      return { ...userData, ERC721tokens: mergedERC721, ERC1155balances: mergedERC1155 };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getOnChainData(publicKey: string): Promise<{ ERC721tokens: any[]; ERC1155balances: any[]; statusERC721S: any[]; statusERC1155S: any[] }> {
    const client = this.getGraphqlClient();
    const sdk = getSdk(client);
    const { account } = await sdk.getNFTwithAccountID({ id: publicKey });
    const { marketEvent721S: statusERC721S = [] } = await sdk.getStatusERC721S();
    const { marketEvent1155S: statusERC1155S = [] } = await sdk.getStatusERC1155S();
    return { ERC721tokens: account?.ERC721tokens || [], ERC1155balances: account?.ERC1155balances || [], statusERC721S, statusERC1155S };
  }

  mergeERCData721(tokens: any[], nftsOwnership: NFTOwnership[], status: any[]): any[] {
    return nftsOwnership.map((nft) => {
      const matchingNFT = tokens.find((token) => nft?.nft?.id === token.id);
      const matchingNFTStatus = (status.find((token) => nft?.nft?.id === token?.nftId?.id) || {});
      delete matchingNFTStatus.nftId;
      return matchingNFT ? { value : (nft?.quantity || 0),...nft?.nft , status : (matchingNFTStatus?.event ? matchingNFTStatus?.event : nft?.nft?.status ) } : {...nft?.nft}
    });
  }


  mergeERCData1155(tokens: any[], nftsOwnership: NFTOwnership[], status: any[]): any[] {
    return nftsOwnership.map((nft) => {
      const matchingNFT = tokens.find((token) => nft?.nft?.id === token?.token?.id);
      const matchingNFTStatus = (status.find((token) => nft?.nft?.id === token?.nftId?.id) || {});
      delete matchingNFTStatus.nftId;
      return matchingNFT ? { value : (matchingNFT?.valueExact || 0) ,...nft?.nft , status : (matchingNFTStatus?.event ? matchingNFTStatus?.event : nft?.nft?.status ) } : {...nft?.nft}
    });
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
      return userData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}