import { Collection, TX_STATUS, CONTRACT_TYPE } from '@prisma/client';

export class CollectionEntity {
  id?: string;
  txCreationHash?: string;
  name?: string;
  symbol?: string;
  description?: string;
  status?: TX_STATUS;
  type?: CONTRACT_TYPE;
  categoryId?: number;
  // creators : string;
  createdAt?: Date;
  updatedAt?: Date;
  isU2U?: boolean;
  projectId?: string;
  avatar?: string;
  metadata?: string;
  shortUrl?: string;
  address?: string;
  nameSlug?: string;
  totalOwner?: number;
  floorPrice?: bigint;
  totalNft?: number;
  volumn?: string;
  coverImage?: string;
  isVerified?: boolean;
}
export enum TXSTATUS {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum CONTRACTTYPE {
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721',
}
