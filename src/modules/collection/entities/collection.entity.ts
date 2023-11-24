import { Collection , TX_STATUS , CONTRACT_TYPE , Category , NFT , UserCollection} from '@prisma/client';

export class CollectionEntity implements Collection {
  id : string;
  txCreationHash : string;
  name : string;
  symbol: string;
  description : string;
  status : TX_STATUS;
  type : CONTRACT_TYPE;
  categoryId : number;
  // creators : string;
  createdAt : Date;
  updatedAt : Date;
  constructor(partial: Partial<Collection>) {
    Object.assign(this, partial);
  }
  metadata: string;
  shortUrl: string;
  address: string;
  totalOwner?: number;
  floorPrice?: string;
  totalNft?: number;
  volumn?: string;

}
export enum TXSTATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export enum CONTRACTTYPE {
  ERC1155 = "ERC1155",
  ERC721 = "ERC721"
}