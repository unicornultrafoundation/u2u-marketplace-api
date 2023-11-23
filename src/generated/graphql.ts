import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  ERC721tokens: Array<Erc721Token>;
  ERC721transferFromEvent: Array<Erc721Transfer>;
  ERC721transferToEvent: Array<Erc721Transfer>;
  ERC1155balances: Array<Erc1155Balance>;
  ERC1155transferFromEvent: Array<Erc1155Transfer>;
  ERC1155transferToEvent: Array<Erc1155Transfer>;
  asERC721?: Maybe<Erc721Contract>;
  asERC1155?: Maybe<Erc1155Contract>;
  events: Array<Event>;
  id: Scalars['String']['output'];
};


export type AccountErc721tokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Token_Filter>;
};


export type AccountErc721transferFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Transfer_Filter>;
};


export type AccountErc721transferToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Transfer_Filter>;
};


export type AccountErc1155balancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Balance_Filter>;
};


export type AccountErc1155transferFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};


export type AccountErc1155transferToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};


export type AccountEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Event_Filter>;
};

export type Account_Filter = {
  ERC721tokens_?: InputMaybe<Erc721Token_Filter>;
  ERC721transferFromEvent_?: InputMaybe<Erc721Transfer_Filter>;
  ERC721transferToEvent_?: InputMaybe<Erc721Transfer_Filter>;
  ERC1155balances_?: InputMaybe<Erc1155Balance_Filter>;
  ERC1155transferFromEvent_?: InputMaybe<Erc1155Transfer_Filter>;
  ERC1155transferToEvent_?: InputMaybe<Erc1155Transfer_Filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  asERC721?: InputMaybe<Scalars['String']['input']>;
  asERC721_?: InputMaybe<Erc721Contract_Filter>;
  asERC721_contains?: InputMaybe<Scalars['String']['input']>;
  asERC721_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC721_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC721_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC721_gt?: InputMaybe<Scalars['String']['input']>;
  asERC721_gte?: InputMaybe<Scalars['String']['input']>;
  asERC721_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC721_lt?: InputMaybe<Scalars['String']['input']>;
  asERC721_lte?: InputMaybe<Scalars['String']['input']>;
  asERC721_not?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_contains?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC721_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC721_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC721_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC721_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155?: InputMaybe<Scalars['String']['input']>;
  asERC1155_?: InputMaybe<Erc1155Contract_Filter>;
  asERC1155_contains?: InputMaybe<Scalars['String']['input']>;
  asERC1155_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC1155_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155_gt?: InputMaybe<Scalars['String']['input']>;
  asERC1155_gte?: InputMaybe<Scalars['String']['input']>;
  asERC1155_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC1155_lt?: InputMaybe<Scalars['String']['input']>;
  asERC1155_lte?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_contains?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asERC1155_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC1155_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asERC1155_starts_with?: InputMaybe<Scalars['String']['input']>;
  asERC1155_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  events_?: InputMaybe<Event_Filter>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
};

export enum Account_OrderBy {
  Erc721tokens = 'ERC721tokens',
  Erc721transferFromEvent = 'ERC721transferFromEvent',
  Erc721transferToEvent = 'ERC721transferToEvent',
  Erc1155balances = 'ERC1155balances',
  Erc1155transferFromEvent = 'ERC1155transferFromEvent',
  Erc1155transferToEvent = 'ERC1155transferToEvent',
  AsErc721 = 'asERC721',
  AsErc721Id = 'asERC721__id',
  AsErc721Name = 'asERC721__name',
  AsErc721SupportsMetadata = 'asERC721__supportsMetadata',
  AsErc721Symbol = 'asERC721__symbol',
  AsErc721TxCreation = 'asERC721__txCreation',
  AsErc1155 = 'asERC1155',
  AsErc1155Id = 'asERC1155__id',
  AsErc1155Name = 'asERC1155__name',
  AsErc1155Symbol = 'asERC1155__symbol',
  AsErc1155TxCreation = 'asERC1155__txCreation',
  Events = 'events',
  Id = 'id'
}

export enum ActionState {
  Executed = 'EXECUTED',
  Pending = 'PENDING'
}

export type Block = {
  __typename?: 'Block';
  blockNumber: Scalars['Int']['output'];
  event: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  timestampt: Scalars['Int']['output'];
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_contains?: InputMaybe<Scalars['String']['input']>;
  event_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_gt?: InputMaybe<Scalars['String']['input']>;
  event_gte?: InputMaybe<Scalars['String']['input']>;
  event_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_lt?: InputMaybe<Scalars['String']['input']>;
  event_lte?: InputMaybe<Scalars['String']['input']>;
  event_not?: InputMaybe<Scalars['String']['input']>;
  event_not_contains?: InputMaybe<Scalars['String']['input']>;
  event_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  timestampt?: InputMaybe<Scalars['Int']['input']>;
  timestampt_gt?: InputMaybe<Scalars['Int']['input']>;
  timestampt_gte?: InputMaybe<Scalars['Int']['input']>;
  timestampt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestampt_lt?: InputMaybe<Scalars['Int']['input']>;
  timestampt_lte?: InputMaybe<Scalars['Int']['input']>;
  timestampt_not?: InputMaybe<Scalars['Int']['input']>;
  timestampt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export enum Block_OrderBy {
  BlockNumber = 'blockNumber',
  Event = 'event',
  Id = 'id',
  Timestampt = 'timestampt'
}

export enum ContractType {
  Erc721Factory = 'ERC721Factory',
  Erc721Proxy = 'ERC721Proxy',
  Erc1155Factory = 'ERC1155Factory',
  Erc1155Proxy = 'ERC1155Proxy',
  ExchangeV2 = 'ExchangeV2',
  NftTransferProxies = 'NFTTransferProxies',
  Royalties = 'Royalties'
}

export type Creator = {
  __typename?: 'Creator';
  id: Scalars['ID']['output'];
  token721: Array<Erc721Creator>;
  token1155: Array<Erc1155Creator>;
};


export type CreatorToken721Args = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Creator_Filter>;
};


export type CreatorToken1155Args = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Creator_Filter>;
};

export type Creator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Creator_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Creator_Filter>>>;
  token721_?: InputMaybe<Erc721Creator_Filter>;
  token1155_?: InputMaybe<Erc1155Creator_Filter>;
};

export enum Creator_OrderBy {
  Id = 'id',
  Token721 = 'token721',
  Token1155 = 'token1155'
}

export enum DealType {
  Bid = 'Bid',
  Order = 'Order'
}

export type Erc721Contract = {
  __typename?: 'ERC721Contract';
  asAccount: Account;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  supportsMetadata?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tokens: Array<Erc721Token>;
  transfers: Array<Erc721Transfer>;
  txCreation: Scalars['String']['output'];
};


export type Erc721ContractTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Token_Filter>;
};


export type Erc721ContractTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Transfer_Filter>;
};

export type Erc721Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc721Contract_Filter>>>;
  asAccount?: InputMaybe<Scalars['String']['input']>;
  asAccount_?: InputMaybe<Account_Filter>;
  asAccount_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_gt?: InputMaybe<Scalars['String']['input']>;
  asAccount_gte?: InputMaybe<Scalars['String']['input']>;
  asAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt?: InputMaybe<Scalars['String']['input']>;
  asAccount_lte?: InputMaybe<Scalars['String']['input']>;
  asAccount_not?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Erc721Contract_Filter>>>;
  supportsMetadata?: InputMaybe<Scalars['Boolean']['input']>;
  supportsMetadata_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  supportsMetadata_not?: InputMaybe<Scalars['Boolean']['input']>;
  supportsMetadata_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokens_?: InputMaybe<Erc721Token_Filter>;
  transfers_?: InputMaybe<Erc721Transfer_Filter>;
  txCreation?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_gt?: InputMaybe<Scalars['String']['input']>;
  txCreation_gte?: InputMaybe<Scalars['String']['input']>;
  txCreation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_lt?: InputMaybe<Scalars['String']['input']>;
  txCreation_lte?: InputMaybe<Scalars['String']['input']>;
  txCreation_not?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc721Contract_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Id = 'id',
  Name = 'name',
  SupportsMetadata = 'supportsMetadata',
  Symbol = 'symbol',
  Tokens = 'tokens',
  Transfers = 'transfers',
  TxCreation = 'txCreation'
}

export type Erc721Creator = {
  __typename?: 'ERC721Creator';
  collection: Erc721Token;
  creator: Creator;
  id: Scalars['ID']['output'];
  share: Scalars['BigInt']['output'];
};

export type Erc721Creator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc721Creator_Filter>>>;
  collection?: InputMaybe<Scalars['String']['input']>;
  collection_?: InputMaybe<Erc721Token_Filter>;
  collection_contains?: InputMaybe<Scalars['String']['input']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_ends_with?: InputMaybe<Scalars['String']['input']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_gt?: InputMaybe<Scalars['String']['input']>;
  collection_gte?: InputMaybe<Scalars['String']['input']>;
  collection_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_lt?: InputMaybe<Scalars['String']['input']>;
  collection_lte?: InputMaybe<Scalars['String']['input']>;
  collection_not?: InputMaybe<Scalars['String']['input']>;
  collection_not_contains?: InputMaybe<Scalars['String']['input']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_starts_with?: InputMaybe<Scalars['String']['input']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  creator_?: InputMaybe<Creator_Filter>;
  creator_contains?: InputMaybe<Scalars['String']['input']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_gt?: InputMaybe<Scalars['String']['input']>;
  creator_gte?: InputMaybe<Scalars['String']['input']>;
  creator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_lt?: InputMaybe<Scalars['String']['input']>;
  creator_lte?: InputMaybe<Scalars['String']['input']>;
  creator_not?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc721Creator_Filter>>>;
  share?: InputMaybe<Scalars['BigInt']['input']>;
  share_gt?: InputMaybe<Scalars['BigInt']['input']>;
  share_gte?: InputMaybe<Scalars['BigInt']['input']>;
  share_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  share_lt?: InputMaybe<Scalars['BigInt']['input']>;
  share_lte?: InputMaybe<Scalars['BigInt']['input']>;
  share_not?: InputMaybe<Scalars['BigInt']['input']>;
  share_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Erc721Creator_OrderBy {
  Collection = 'collection',
  CollectionId = 'collection__id',
  CollectionIdentifier = 'collection__identifier',
  CollectionTxCreation = 'collection__txCreation',
  CollectionUri = 'collection__uri',
  Creator = 'creator',
  CreatorId = 'creator__id',
  Id = 'id',
  Share = 'share'
}

export type Erc721Token = {
  __typename?: 'ERC721Token';
  approval: Account;
  contract: Erc721Contract;
  creators: Array<Erc721Creator>;
  id: Scalars['ID']['output'];
  identifier: Scalars['BigInt']['output'];
  owner: Account;
  transfers: Array<Erc721Transfer>;
  txCreation: Scalars['String']['output'];
  uri?: Maybe<Scalars['String']['output']>;
};


export type Erc721TokenCreatorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Creator_Filter>;
};


export type Erc721TokenTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc721Transfer_Filter>;
};

export type Erc721Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc721Token_Filter>>>;
  approval?: InputMaybe<Scalars['String']['input']>;
  approval_?: InputMaybe<Account_Filter>;
  approval_contains?: InputMaybe<Scalars['String']['input']>;
  approval_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  approval_ends_with?: InputMaybe<Scalars['String']['input']>;
  approval_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  approval_gt?: InputMaybe<Scalars['String']['input']>;
  approval_gte?: InputMaybe<Scalars['String']['input']>;
  approval_in?: InputMaybe<Array<Scalars['String']['input']>>;
  approval_lt?: InputMaybe<Scalars['String']['input']>;
  approval_lte?: InputMaybe<Scalars['String']['input']>;
  approval_not?: InputMaybe<Scalars['String']['input']>;
  approval_not_contains?: InputMaybe<Scalars['String']['input']>;
  approval_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  approval_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  approval_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  approval_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  approval_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  approval_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  approval_starts_with?: InputMaybe<Scalars['String']['input']>;
  approval_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc721Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creators_?: InputMaybe<Erc721Creator_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  identifier?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  identifier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_not?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc721Token_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transfers_?: InputMaybe<Erc721Transfer_Filter>;
  txCreation?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_gt?: InputMaybe<Scalars['String']['input']>;
  txCreation_gte?: InputMaybe<Scalars['String']['input']>;
  txCreation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_lt?: InputMaybe<Scalars['String']['input']>;
  txCreation_lte?: InputMaybe<Scalars['String']['input']>;
  txCreation_not?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc721Token_OrderBy {
  Approval = 'approval',
  ApprovalId = 'approval__id',
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSupportsMetadata = 'contract__supportsMetadata',
  ContractSymbol = 'contract__symbol',
  ContractTxCreation = 'contract__txCreation',
  Creators = 'creators',
  Id = 'id',
  Identifier = 'identifier',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Transfers = 'transfers',
  TxCreation = 'txCreation',
  Uri = 'uri'
}

export type Erc721Transfer = Event & {
  __typename?: 'ERC721Transfer';
  contract: Erc721Contract;
  emitter: Account;
  from: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Account;
  token: Erc721Token;
  transaction: Transaction;
};

export type Erc721Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc721Transfer_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc721Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter?: InputMaybe<Scalars['String']['input']>;
  emitter_?: InputMaybe<Account_Filter>;
  emitter_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_gt?: InputMaybe<Scalars['String']['input']>;
  emitter_gte?: InputMaybe<Scalars['String']['input']>;
  emitter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt?: InputMaybe<Scalars['String']['input']>;
  emitter_lte?: InputMaybe<Scalars['String']['input']>;
  emitter_not?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc721Transfer_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Erc721Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc721Transfer_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSupportsMetadata = 'contract__supportsMetadata',
  ContractSymbol = 'contract__symbol',
  ContractTxCreation = 'contract__txCreation',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  From = 'from',
  FromId = 'from__id',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  ToId = 'to__id',
  Token = 'token',
  TokenId = 'token__id',
  TokenIdentifier = 'token__identifier',
  TokenTxCreation = 'token__txCreation',
  TokenUri = 'token__uri',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Erc1155Balance = {
  __typename?: 'ERC1155Balance';
  account?: Maybe<Account>;
  contract?: Maybe<Erc1155Contract>;
  id: Scalars['ID']['output'];
  token: Erc1155Token;
  transferFromEvent: Array<Erc1155Transfer>;
  transferToEvent: Array<Erc1155Transfer>;
  value: Scalars['BigDecimal']['output'];
  valueExact: Scalars['BigInt']['output'];
};


export type Erc1155BalanceTransferFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};


export type Erc1155BalanceTransferToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};

export type Erc1155Balance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Erc1155Balance_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc1155Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc1155Balance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Erc1155Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferFromEvent_?: InputMaybe<Erc1155Transfer_Filter>;
  transferToEvent_?: InputMaybe<Erc1155Transfer_Filter>;
  value?: InputMaybe<Scalars['BigDecimal']['input']>;
  valueExact?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valueExact_lt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_lte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum Erc1155Balance_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  ContractTxCreation = 'contract__txCreation',
  Id = 'id',
  Token = 'token',
  TokenId = 'token__id',
  TokenIdentifier = 'token__identifier',
  TokenTxCreation = 'token__txCreation',
  TokenUri = 'token__uri',
  TransferFromEvent = 'transferFromEvent',
  TransferToEvent = 'transferToEvent',
  Value = 'value',
  ValueExact = 'valueExact'
}

export type Erc1155Contract = {
  __typename?: 'ERC1155Contract';
  asAccount: Account;
  balances: Array<Erc1155Balance>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tokens: Array<Erc1155Token>;
  transfers: Array<Erc1155Transfer>;
  txCreation: Scalars['String']['output'];
};


export type Erc1155ContractBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Balance_Filter>;
};


export type Erc1155ContractTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Token_Filter>;
};


export type Erc1155ContractTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};

export type Erc1155Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc1155Contract_Filter>>>;
  asAccount?: InputMaybe<Scalars['String']['input']>;
  asAccount_?: InputMaybe<Account_Filter>;
  asAccount_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_gt?: InputMaybe<Scalars['String']['input']>;
  asAccount_gte?: InputMaybe<Scalars['String']['input']>;
  asAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt?: InputMaybe<Scalars['String']['input']>;
  asAccount_lte?: InputMaybe<Scalars['String']['input']>;
  asAccount_not?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  balances_?: InputMaybe<Erc1155Balance_Filter>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Erc1155Contract_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokens_?: InputMaybe<Erc1155Token_Filter>;
  transfers_?: InputMaybe<Erc1155Transfer_Filter>;
  txCreation?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_gt?: InputMaybe<Scalars['String']['input']>;
  txCreation_gte?: InputMaybe<Scalars['String']['input']>;
  txCreation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_lt?: InputMaybe<Scalars['String']['input']>;
  txCreation_lte?: InputMaybe<Scalars['String']['input']>;
  txCreation_not?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc1155Contract_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Balances = 'balances',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  Tokens = 'tokens',
  Transfers = 'transfers',
  TxCreation = 'txCreation'
}

export type Erc1155Creator = {
  __typename?: 'ERC1155Creator';
  collection: Erc1155Token;
  creator: Creator;
  id: Scalars['ID']['output'];
  share: Scalars['BigInt']['output'];
};

export type Erc1155Creator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc1155Creator_Filter>>>;
  collection?: InputMaybe<Scalars['String']['input']>;
  collection_?: InputMaybe<Erc1155Token_Filter>;
  collection_contains?: InputMaybe<Scalars['String']['input']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_ends_with?: InputMaybe<Scalars['String']['input']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_gt?: InputMaybe<Scalars['String']['input']>;
  collection_gte?: InputMaybe<Scalars['String']['input']>;
  collection_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_lt?: InputMaybe<Scalars['String']['input']>;
  collection_lte?: InputMaybe<Scalars['String']['input']>;
  collection_not?: InputMaybe<Scalars['String']['input']>;
  collection_not_contains?: InputMaybe<Scalars['String']['input']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collection_starts_with?: InputMaybe<Scalars['String']['input']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  creator_?: InputMaybe<Creator_Filter>;
  creator_contains?: InputMaybe<Scalars['String']['input']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_gt?: InputMaybe<Scalars['String']['input']>;
  creator_gte?: InputMaybe<Scalars['String']['input']>;
  creator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_lt?: InputMaybe<Scalars['String']['input']>;
  creator_lte?: InputMaybe<Scalars['String']['input']>;
  creator_not?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc1155Creator_Filter>>>;
  share?: InputMaybe<Scalars['BigInt']['input']>;
  share_gt?: InputMaybe<Scalars['BigInt']['input']>;
  share_gte?: InputMaybe<Scalars['BigInt']['input']>;
  share_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  share_lt?: InputMaybe<Scalars['BigInt']['input']>;
  share_lte?: InputMaybe<Scalars['BigInt']['input']>;
  share_not?: InputMaybe<Scalars['BigInt']['input']>;
  share_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Erc1155Creator_OrderBy {
  Collection = 'collection',
  CollectionId = 'collection__id',
  CollectionIdentifier = 'collection__identifier',
  CollectionTxCreation = 'collection__txCreation',
  CollectionUri = 'collection__uri',
  Creator = 'creator',
  CreatorId = 'creator__id',
  Id = 'id',
  Share = 'share'
}

export type Erc1155Token = {
  __typename?: 'ERC1155Token';
  balances: Array<Erc1155Balance>;
  contract: Erc1155Contract;
  creators: Array<Erc1155Creator>;
  id: Scalars['ID']['output'];
  identifier: Scalars['BigInt']['output'];
  totalSupply: Erc1155Balance;
  transfers: Array<Erc1155Transfer>;
  txCreation: Scalars['String']['output'];
  uri?: Maybe<Scalars['String']['output']>;
};


export type Erc1155TokenBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Balance_Filter>;
};


export type Erc1155TokenCreatorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Creator_Filter>;
};


export type Erc1155TokenTransfersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};

export type Erc1155Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc1155Token_Filter>>>;
  balances_?: InputMaybe<Erc1155Balance_Filter>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc1155Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creators_?: InputMaybe<Erc1155Creator_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  identifier?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  identifier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_not?: InputMaybe<Scalars['BigInt']['input']>;
  identifier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc1155Token_Filter>>>;
  totalSupply?: InputMaybe<Scalars['String']['input']>;
  totalSupply_?: InputMaybe<Erc1155Balance_Filter>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_ends_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transfers_?: InputMaybe<Erc1155Transfer_Filter>;
  txCreation?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_gt?: InputMaybe<Scalars['String']['input']>;
  txCreation_gte?: InputMaybe<Scalars['String']['input']>;
  txCreation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_lt?: InputMaybe<Scalars['String']['input']>;
  txCreation_lte?: InputMaybe<Scalars['String']['input']>;
  txCreation_not?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txCreation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with?: InputMaybe<Scalars['String']['input']>;
  txCreation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc1155Token_OrderBy {
  Balances = 'balances',
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  ContractTxCreation = 'contract__txCreation',
  Creators = 'creators',
  Id = 'id',
  Identifier = 'identifier',
  TotalSupply = 'totalSupply',
  TotalSupplyId = 'totalSupply__id',
  TotalSupplyValue = 'totalSupply__value',
  TotalSupplyValueExact = 'totalSupply__valueExact',
  Transfers = 'transfers',
  TxCreation = 'txCreation',
  Uri = 'uri'
}

export type Erc1155Transfer = Event & {
  __typename?: 'ERC1155Transfer';
  contract: Erc1155Contract;
  emitter: Account;
  from?: Maybe<Account>;
  fromBalance?: Maybe<Erc1155Balance>;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  to?: Maybe<Account>;
  toBalance?: Maybe<Erc1155Balance>;
  token: Erc1155Token;
  transaction: Transaction;
  value: Scalars['BigDecimal']['output'];
  valueExact: Scalars['BigInt']['output'];
};

export type Erc1155Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Erc1155Transfer_Filter>>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_?: InputMaybe<Erc1155Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter?: InputMaybe<Scalars['String']['input']>;
  emitter_?: InputMaybe<Account_Filter>;
  emitter_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_gt?: InputMaybe<Scalars['String']['input']>;
  emitter_gte?: InputMaybe<Scalars['String']['input']>;
  emitter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt?: InputMaybe<Scalars['String']['input']>;
  emitter_lte?: InputMaybe<Scalars['String']['input']>;
  emitter_not?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  fromBalance?: InputMaybe<Scalars['String']['input']>;
  fromBalance_?: InputMaybe<Erc1155Balance_Filter>;
  fromBalance_contains?: InputMaybe<Scalars['String']['input']>;
  fromBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_gt?: InputMaybe<Scalars['String']['input']>;
  fromBalance_gte?: InputMaybe<Scalars['String']['input']>;
  fromBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromBalance_lt?: InputMaybe<Scalars['String']['input']>;
  fromBalance_lte?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Erc1155Transfer_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  toBalance?: InputMaybe<Scalars['String']['input']>;
  toBalance_?: InputMaybe<Erc1155Balance_Filter>;
  toBalance_contains?: InputMaybe<Scalars['String']['input']>;
  toBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_gt?: InputMaybe<Scalars['String']['input']>;
  toBalance_gte?: InputMaybe<Scalars['String']['input']>;
  toBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toBalance_lt?: InputMaybe<Scalars['String']['input']>;
  toBalance_lte?: InputMaybe<Scalars['String']['input']>;
  toBalance_not?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  toBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Erc1155Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['BigDecimal']['input']>;
  valueExact?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_gte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  valueExact_lt?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_lte?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not?: InputMaybe<Scalars['BigInt']['input']>;
  valueExact_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum Erc1155Transfer_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  ContractName = 'contract__name',
  ContractSymbol = 'contract__symbol',
  ContractTxCreation = 'contract__txCreation',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  From = 'from',
  FromBalance = 'fromBalance',
  FromBalanceId = 'fromBalance__id',
  FromBalanceValue = 'fromBalance__value',
  FromBalanceValueExact = 'fromBalance__valueExact',
  FromId = 'from__id',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  ToBalance = 'toBalance',
  ToBalanceId = 'toBalance__id',
  ToBalanceValue = 'toBalance__value',
  ToBalanceValueExact = 'toBalance__valueExact',
  ToId = 'to__id',
  Token = 'token',
  TokenId = 'token__id',
  TokenIdentifier = 'token__identifier',
  TokenTxCreation = 'token__txCreation',
  TokenUri = 'token__uri',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  Value = 'value',
  ValueExact = 'valueExact'
}

export type Event = {
  emitter: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  emitter?: InputMaybe<Scalars['String']['input']>;
  emitter_?: InputMaybe<Account_Filter>;
  emitter_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_gt?: InputMaybe<Scalars['String']['input']>;
  emitter_gte?: InputMaybe<Scalars['String']['input']>;
  emitter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt?: InputMaybe<Scalars['String']['input']>;
  emitter_lte?: InputMaybe<Scalars['String']['input']>;
  emitter_not?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with?: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Event_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type MarketEvent721 = {
  __typename?: 'MarketEvent721';
  address: Scalars['String']['output'];
  event: SellStatus;
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  netPrice?: Maybe<Scalars['BigInt']['output']>;
  nftId: Erc721Token;
  price?: Maybe<Scalars['BigInt']['output']>;
  quoteToken?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to?: Maybe<Scalars['String']['output']>;
  txHash: Scalars['String']['output'];
};

export type MarketEvent721_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<MarketEvent721_Filter>>>;
  event?: InputMaybe<SellStatus>;
  event_in?: InputMaybe<Array<SellStatus>>;
  event_not?: InputMaybe<SellStatus>;
  event_not_in?: InputMaybe<Array<SellStatus>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_gt?: InputMaybe<Scalars['String']['input']>;
  metadata_gte?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_lt?: InputMaybe<Scalars['String']['input']>;
  metadata_lte?: InputMaybe<Scalars['String']['input']>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  netPrice?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  netPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftId?: InputMaybe<Scalars['String']['input']>;
  nftId_?: InputMaybe<Erc721Token_Filter>;
  nftId_contains?: InputMaybe<Scalars['String']['input']>;
  nftId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_gt?: InputMaybe<Scalars['String']['input']>;
  nftId_gte?: InputMaybe<Scalars['String']['input']>;
  nftId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftId_lt?: InputMaybe<Scalars['String']['input']>;
  nftId_lte?: InputMaybe<Scalars['String']['input']>;
  nftId_not?: InputMaybe<Scalars['String']['input']>;
  nftId_not_contains?: InputMaybe<Scalars['String']['input']>;
  nftId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketEvent721_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quoteToken?: InputMaybe<Scalars['String']['input']>;
  quoteToken_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_gt?: InputMaybe<Scalars['String']['input']>;
  quoteToken_gte?: InputMaybe<Scalars['String']['input']>;
  quoteToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteToken_lt?: InputMaybe<Scalars['String']['input']>;
  quoteToken_lte?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MarketEvent721_OrderBy {
  Address = 'address',
  Event = 'event',
  From = 'from',
  Id = 'id',
  Metadata = 'metadata',
  NetPrice = 'netPrice',
  NftId = 'nftId',
  NftIdId = 'nftId__id',
  NftIdIdentifier = 'nftId__identifier',
  NftIdTxCreation = 'nftId__txCreation',
  NftIdUri = 'nftId__uri',
  Price = 'price',
  QuoteToken = 'quoteToken',
  Timestamp = 'timestamp',
  To = 'to',
  TxHash = 'txHash'
}

export type MarketEvent1155 = {
  __typename?: 'MarketEvent1155';
  address?: Maybe<Scalars['String']['output']>;
  amounts: Scalars['BigInt']['output'];
  event: SellStatus;
  from?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  netPrice?: Maybe<Scalars['BigInt']['output']>;
  nftId?: Maybe<Erc1155Token>;
  operationId: Scalars['BigInt']['output'];
  price?: Maybe<Scalars['BigInt']['output']>;
  quoteToken?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to?: Maybe<Scalars['String']['output']>;
  txHash: Scalars['String']['output'];
};

export type MarketEvent1155_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  amounts?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amounts_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_not?: InputMaybe<Scalars['BigInt']['input']>;
  amounts_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<MarketEvent1155_Filter>>>;
  event?: InputMaybe<SellStatus>;
  event_in?: InputMaybe<Array<SellStatus>>;
  event_not?: InputMaybe<SellStatus>;
  event_not_in?: InputMaybe<Array<SellStatus>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_gt?: InputMaybe<Scalars['String']['input']>;
  metadata_gte?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_lt?: InputMaybe<Scalars['String']['input']>;
  metadata_lte?: InputMaybe<Scalars['String']['input']>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  netPrice?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  netPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  netPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftId?: InputMaybe<Scalars['String']['input']>;
  nftId_?: InputMaybe<Erc1155Token_Filter>;
  nftId_contains?: InputMaybe<Scalars['String']['input']>;
  nftId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_gt?: InputMaybe<Scalars['String']['input']>;
  nftId_gte?: InputMaybe<Scalars['String']['input']>;
  nftId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftId_lt?: InputMaybe<Scalars['String']['input']>;
  nftId_lte?: InputMaybe<Scalars['String']['input']>;
  nftId_not?: InputMaybe<Scalars['String']['input']>;
  nftId_not_contains?: InputMaybe<Scalars['String']['input']>;
  nftId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftId_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  operationId?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operationId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_not?: InputMaybe<Scalars['BigInt']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MarketEvent1155_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quoteToken?: InputMaybe<Scalars['String']['input']>;
  quoteToken_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_gt?: InputMaybe<Scalars['String']['input']>;
  quoteToken_gte?: InputMaybe<Scalars['String']['input']>;
  quoteToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteToken_lt?: InputMaybe<Scalars['String']['input']>;
  quoteToken_lte?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MarketEvent1155_OrderBy {
  Address = 'address',
  Amounts = 'amounts',
  Event = 'event',
  From = 'from',
  Id = 'id',
  Metadata = 'metadata',
  NetPrice = 'netPrice',
  NftId = 'nftId',
  NftIdId = 'nftId__id',
  NftIdIdentifier = 'nftId__identifier',
  NftIdTxCreation = 'nftId__txCreation',
  NftIdUri = 'nftId__uri',
  OperationId = 'operationId',
  Price = 'price',
  QuoteToken = 'quoteToken',
  Timestamp = 'timestamp',
  To = 'to',
  TxHash = 'txHash'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  creator?: Maybe<Creator>;
  creators: Array<Creator>;
  erc721Contract?: Maybe<Erc721Contract>;
  erc721Contracts: Array<Erc721Contract>;
  erc721Creator?: Maybe<Erc721Creator>;
  erc721Creators: Array<Erc721Creator>;
  erc721Token?: Maybe<Erc721Token>;
  erc721Tokens: Array<Erc721Token>;
  erc721Transfer?: Maybe<Erc721Transfer>;
  erc721Transfers: Array<Erc721Transfer>;
  erc1155Balance?: Maybe<Erc1155Balance>;
  erc1155Balances: Array<Erc1155Balance>;
  erc1155Contract?: Maybe<Erc1155Contract>;
  erc1155Contracts: Array<Erc1155Contract>;
  erc1155Creator?: Maybe<Erc1155Creator>;
  erc1155Creators: Array<Erc1155Creator>;
  erc1155Token?: Maybe<Erc1155Token>;
  erc1155Tokens: Array<Erc1155Token>;
  erc1155Transfer?: Maybe<Erc1155Transfer>;
  erc1155Transfers: Array<Erc1155Transfer>;
  event?: Maybe<Event>;
  events: Array<Event>;
  marketEvent721?: Maybe<MarketEvent721>;
  marketEvent721S: Array<MarketEvent721>;
  marketEvent1155?: Maybe<MarketEvent1155>;
  marketEvent1155S: Array<MarketEvent1155>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};


export type QueryCreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Creator_Filter>;
};


export type QueryErc721ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc721ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Contract_Filter>;
};


export type QueryErc721CreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc721CreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Creator_Filter>;
};


export type QueryErc721TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc721TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Token_Filter>;
};


export type QueryErc721TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc721TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Transfer_Filter>;
};


export type QueryErc1155BalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc1155BalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Balance_Filter>;
};


export type QueryErc1155ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc1155ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Contract_Filter>;
};


export type QueryErc1155CreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc1155CreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Creator_Filter>;
};


export type QueryErc1155TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc1155TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Token_Filter>;
};


export type QueryErc1155TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc1155TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};


export type QueryEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
};


export type QueryMarketEvent721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketEvent721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketEvent721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketEvent721_Filter>;
};


export type QueryMarketEvent1155Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketEvent1155SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketEvent1155_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketEvent1155_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export enum SellStatus {
  AcceptBid = 'AcceptBid',
  AskCancel = 'AskCancel',
  AskNew = 'AskNew',
  Bid = 'Bid',
  CancelBid = 'CancelBid',
  Trade = 'Trade'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  creator?: Maybe<Creator>;
  creators: Array<Creator>;
  erc721Contract?: Maybe<Erc721Contract>;
  erc721Contracts: Array<Erc721Contract>;
  erc721Creator?: Maybe<Erc721Creator>;
  erc721Creators: Array<Erc721Creator>;
  erc721Token?: Maybe<Erc721Token>;
  erc721Tokens: Array<Erc721Token>;
  erc721Transfer?: Maybe<Erc721Transfer>;
  erc721Transfers: Array<Erc721Transfer>;
  erc1155Balance?: Maybe<Erc1155Balance>;
  erc1155Balances: Array<Erc1155Balance>;
  erc1155Contract?: Maybe<Erc1155Contract>;
  erc1155Contracts: Array<Erc1155Contract>;
  erc1155Creator?: Maybe<Erc1155Creator>;
  erc1155Creators: Array<Erc1155Creator>;
  erc1155Token?: Maybe<Erc1155Token>;
  erc1155Tokens: Array<Erc1155Token>;
  erc1155Transfer?: Maybe<Erc1155Transfer>;
  erc1155Transfers: Array<Erc1155Transfer>;
  event?: Maybe<Event>;
  events: Array<Event>;
  marketEvent721?: Maybe<MarketEvent721>;
  marketEvent721S: Array<MarketEvent721>;
  marketEvent1155?: Maybe<MarketEvent1155>;
  marketEvent1155S: Array<MarketEvent1155>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};


export type SubscriptionCreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Creator_Filter>;
};


export type SubscriptionErc721ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc721ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Contract_Filter>;
};


export type SubscriptionErc721CreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc721CreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Creator_Filter>;
};


export type SubscriptionErc721TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc721TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Token_Filter>;
};


export type SubscriptionErc721TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc721TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc721Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc721Transfer_Filter>;
};


export type SubscriptionErc1155BalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc1155BalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Balance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Balance_Filter>;
};


export type SubscriptionErc1155ContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc1155ContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Contract_Filter>;
};


export type SubscriptionErc1155CreatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc1155CreatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Creator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Creator_Filter>;
};


export type SubscriptionErc1155TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc1155TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Token_Filter>;
};


export type SubscriptionErc1155TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc1155TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Erc1155Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Transfer_Filter>;
};


export type SubscriptionEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
};


export type SubscriptionMarketEvent721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketEvent721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketEvent721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketEvent721_Filter>;
};


export type SubscriptionMarketEvent1155Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketEvent1155SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketEvent1155_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketEvent1155_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  events: Array<Event>;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
};


export type TransactionEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Event_Filter>;
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  events_?: InputMaybe<Event_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Events = 'events',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Event: ( Erc721Transfer ) | ( Erc1155Transfer );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Account_filter: Account_Filter;
  Account_orderBy: Account_OrderBy;
  ActionState: ActionState;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Block: ResolverTypeWrapper<Block>;
  BlockChangedFilter: BlockChangedFilter;
  Block_filter: Block_Filter;
  Block_height: Block_Height;
  Block_orderBy: Block_OrderBy;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  ContractType: ContractType;
  Creator: ResolverTypeWrapper<Creator>;
  Creator_filter: Creator_Filter;
  Creator_orderBy: Creator_OrderBy;
  DealType: DealType;
  ERC721Contract: ResolverTypeWrapper<Erc721Contract>;
  ERC721Contract_filter: Erc721Contract_Filter;
  ERC721Contract_orderBy: Erc721Contract_OrderBy;
  ERC721Creator: ResolverTypeWrapper<Erc721Creator>;
  ERC721Creator_filter: Erc721Creator_Filter;
  ERC721Creator_orderBy: Erc721Creator_OrderBy;
  ERC721Token: ResolverTypeWrapper<Erc721Token>;
  ERC721Token_filter: Erc721Token_Filter;
  ERC721Token_orderBy: Erc721Token_OrderBy;
  ERC721Transfer: ResolverTypeWrapper<Erc721Transfer>;
  ERC721Transfer_filter: Erc721Transfer_Filter;
  ERC721Transfer_orderBy: Erc721Transfer_OrderBy;
  ERC1155Balance: ResolverTypeWrapper<Erc1155Balance>;
  ERC1155Balance_filter: Erc1155Balance_Filter;
  ERC1155Balance_orderBy: Erc1155Balance_OrderBy;
  ERC1155Contract: ResolverTypeWrapper<Erc1155Contract>;
  ERC1155Contract_filter: Erc1155Contract_Filter;
  ERC1155Contract_orderBy: Erc1155Contract_OrderBy;
  ERC1155Creator: ResolverTypeWrapper<Erc1155Creator>;
  ERC1155Creator_filter: Erc1155Creator_Filter;
  ERC1155Creator_orderBy: Erc1155Creator_OrderBy;
  ERC1155Token: ResolverTypeWrapper<Erc1155Token>;
  ERC1155Token_filter: Erc1155Token_Filter;
  ERC1155Token_orderBy: Erc1155Token_OrderBy;
  ERC1155Transfer: ResolverTypeWrapper<Erc1155Transfer>;
  ERC1155Transfer_filter: Erc1155Transfer_Filter;
  ERC1155Transfer_orderBy: Erc1155Transfer_OrderBy;
  Event: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Event']>;
  Event_filter: Event_Filter;
  Event_orderBy: Event_OrderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  MarketEvent721: ResolverTypeWrapper<MarketEvent721>;
  MarketEvent721_filter: MarketEvent721_Filter;
  MarketEvent721_orderBy: MarketEvent721_OrderBy;
  MarketEvent1155: ResolverTypeWrapper<MarketEvent1155>;
  MarketEvent1155_filter: MarketEvent1155_Filter;
  MarketEvent1155_orderBy: MarketEvent1155_OrderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  SellStatus: SellStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_Filter;
  Transaction_orderBy: Transaction_OrderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Account_filter: Account_Filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  Block: Block;
  BlockChangedFilter: BlockChangedFilter;
  Block_filter: Block_Filter;
  Block_height: Block_Height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Creator: Creator;
  Creator_filter: Creator_Filter;
  ERC721Contract: Erc721Contract;
  ERC721Contract_filter: Erc721Contract_Filter;
  ERC721Creator: Erc721Creator;
  ERC721Creator_filter: Erc721Creator_Filter;
  ERC721Token: Erc721Token;
  ERC721Token_filter: Erc721Token_Filter;
  ERC721Transfer: Erc721Transfer;
  ERC721Transfer_filter: Erc721Transfer_Filter;
  ERC1155Balance: Erc1155Balance;
  ERC1155Balance_filter: Erc1155Balance_Filter;
  ERC1155Contract: Erc1155Contract;
  ERC1155Contract_filter: Erc1155Contract_Filter;
  ERC1155Creator: Erc1155Creator;
  ERC1155Creator_filter: Erc1155Creator_Filter;
  ERC1155Token: Erc1155Token;
  ERC1155Token_filter: Erc1155Token_Filter;
  ERC1155Transfer: Erc1155Transfer;
  ERC1155Transfer_filter: Erc1155Transfer_Filter;
  Event: ResolversInterfaceTypes<ResolversParentTypes>['Event'];
  Event_filter: Event_Filter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  MarketEvent721: MarketEvent721;
  MarketEvent721_filter: MarketEvent721_Filter;
  MarketEvent1155: MarketEvent1155;
  MarketEvent1155_filter: MarketEvent1155_Filter;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Transaction: Transaction;
  Transaction_filter: Transaction_Filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
};

export type DerivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  ERC721tokens?: Resolver<Array<ResolversTypes['ERC721Token']>, ParentType, ContextType, RequireFields<AccountErc721tokensArgs, 'first' | 'skip'>>;
  ERC721transferFromEvent?: Resolver<Array<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<AccountErc721transferFromEventArgs, 'first' | 'skip'>>;
  ERC721transferToEvent?: Resolver<Array<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<AccountErc721transferToEventArgs, 'first' | 'skip'>>;
  ERC1155balances?: Resolver<Array<ResolversTypes['ERC1155Balance']>, ParentType, ContextType, RequireFields<AccountErc1155balancesArgs, 'first' | 'skip'>>;
  ERC1155transferFromEvent?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<AccountErc1155transferFromEventArgs, 'first' | 'skip'>>;
  ERC1155transferToEvent?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<AccountErc1155transferToEventArgs, 'first' | 'skip'>>;
  asERC721?: Resolver<Maybe<ResolversTypes['ERC721Contract']>, ParentType, ContextType>;
  asERC1155?: Resolver<Maybe<ResolversTypes['ERC1155Contract']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<AccountEventsArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestampt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token721?: Resolver<Array<ResolversTypes['ERC721Creator']>, ParentType, ContextType, RequireFields<CreatorToken721Args, 'first' | 'skip'>>;
  token1155?: Resolver<Array<ResolversTypes['ERC1155Creator']>, ParentType, ContextType, RequireFields<CreatorToken1155Args, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc721ContractResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC721Contract'] = ResolversParentTypes['ERC721Contract']> = {
  asAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supportsMetadata?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['ERC721Token']>, ParentType, ContextType, RequireFields<Erc721ContractTokensArgs, 'first' | 'skip'>>;
  transfers?: Resolver<Array<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<Erc721ContractTransfersArgs, 'first' | 'skip'>>;
  txCreation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc721CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC721Creator'] = ResolversParentTypes['ERC721Creator']> = {
  collection?: Resolver<ResolversTypes['ERC721Token'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc721TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC721Token'] = ResolversParentTypes['ERC721Token']> = {
  approval?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  contract?: Resolver<ResolversTypes['ERC721Contract'], ParentType, ContextType>;
  creators?: Resolver<Array<ResolversTypes['ERC721Creator']>, ParentType, ContextType, RequireFields<Erc721TokenCreatorsArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<Erc721TokenTransfersArgs, 'first' | 'skip'>>;
  txCreation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc721TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC721Transfer'] = ResolversParentTypes['ERC721Transfer']> = {
  contract?: Resolver<ResolversTypes['ERC721Contract'], ParentType, ContextType>;
  emitter?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['ERC721Token'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155BalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC1155Balance'] = ResolversParentTypes['ERC1155Balance']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  contract?: Resolver<Maybe<ResolversTypes['ERC1155Contract']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['ERC1155Token'], ParentType, ContextType>;
  transferFromEvent?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<Erc1155BalanceTransferFromEventArgs, 'first' | 'skip'>>;
  transferToEvent?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<Erc1155BalanceTransferToEventArgs, 'first' | 'skip'>>;
  value?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  valueExact?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155ContractResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC1155Contract'] = ResolversParentTypes['ERC1155Contract']> = {
  asAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  balances?: Resolver<Array<ResolversTypes['ERC1155Balance']>, ParentType, ContextType, RequireFields<Erc1155ContractBalancesArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['ERC1155Token']>, ParentType, ContextType, RequireFields<Erc1155ContractTokensArgs, 'first' | 'skip'>>;
  transfers?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<Erc1155ContractTransfersArgs, 'first' | 'skip'>>;
  txCreation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC1155Creator'] = ResolversParentTypes['ERC1155Creator']> = {
  collection?: Resolver<ResolversTypes['ERC1155Token'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC1155Token'] = ResolversParentTypes['ERC1155Token']> = {
  balances?: Resolver<Array<ResolversTypes['ERC1155Balance']>, ParentType, ContextType, RequireFields<Erc1155TokenBalancesArgs, 'first' | 'skip'>>;
  contract?: Resolver<ResolversTypes['ERC1155Contract'], ParentType, ContextType>;
  creators?: Resolver<Array<ResolversTypes['ERC1155Creator']>, ParentType, ContextType, RequireFields<Erc1155TokenCreatorsArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['ERC1155Balance'], ParentType, ContextType>;
  transfers?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<Erc1155TokenTransfersArgs, 'first' | 'skip'>>;
  txCreation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['ERC1155Transfer'] = ResolversParentTypes['ERC1155Transfer']> = {
  contract?: Resolver<ResolversTypes['ERC1155Contract'], ParentType, ContextType>;
  emitter?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  fromBalance?: Resolver<Maybe<ResolversTypes['ERC1155Balance']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  toBalance?: Resolver<Maybe<ResolversTypes['ERC1155Balance']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['ERC1155Token'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  valueExact?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'ERC721Transfer' | 'ERC1155Transfer', ParentType, ContextType>;
  emitter?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
};

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MarketEvent721Resolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketEvent721'] = ResolversParentTypes['MarketEvent721']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['SellStatus'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  netPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nftId?: Resolver<ResolversTypes['ERC721Token'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  quoteToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketEvent1155Resolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketEvent1155'] = ResolversParentTypes['MarketEvent1155']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amounts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['SellStatus'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  netPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nftId?: Resolver<Maybe<ResolversTypes['ERC1155Token']>, ParentType, ContextType>;
  operationId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  quoteToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_MetaArgs>>;
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'id' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountsArgs, 'first' | 'skip' | 'subgraphError'>>;
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryBlockArgs, 'id' | 'subgraphError'>>;
  blocks?: Resolver<Array<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryBlocksArgs, 'first' | 'skip' | 'subgraphError'>>;
  creator?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType, RequireFields<QueryCreatorArgs, 'id' | 'subgraphError'>>;
  creators?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType, RequireFields<QueryCreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Contract?: Resolver<Maybe<ResolversTypes['ERC721Contract']>, ParentType, ContextType, RequireFields<QueryErc721ContractArgs, 'id' | 'subgraphError'>>;
  erc721Contracts?: Resolver<Array<ResolversTypes['ERC721Contract']>, ParentType, ContextType, RequireFields<QueryErc721ContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Creator?: Resolver<Maybe<ResolversTypes['ERC721Creator']>, ParentType, ContextType, RequireFields<QueryErc721CreatorArgs, 'id' | 'subgraphError'>>;
  erc721Creators?: Resolver<Array<ResolversTypes['ERC721Creator']>, ParentType, ContextType, RequireFields<QueryErc721CreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Token?: Resolver<Maybe<ResolversTypes['ERC721Token']>, ParentType, ContextType, RequireFields<QueryErc721TokenArgs, 'id' | 'subgraphError'>>;
  erc721Tokens?: Resolver<Array<ResolversTypes['ERC721Token']>, ParentType, ContextType, RequireFields<QueryErc721TokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Transfer?: Resolver<Maybe<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<QueryErc721TransferArgs, 'id' | 'subgraphError'>>;
  erc721Transfers?: Resolver<Array<ResolversTypes['ERC721Transfer']>, ParentType, ContextType, RequireFields<QueryErc721TransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Balance?: Resolver<Maybe<ResolversTypes['ERC1155Balance']>, ParentType, ContextType, RequireFields<QueryErc1155BalanceArgs, 'id' | 'subgraphError'>>;
  erc1155Balances?: Resolver<Array<ResolversTypes['ERC1155Balance']>, ParentType, ContextType, RequireFields<QueryErc1155BalancesArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Contract?: Resolver<Maybe<ResolversTypes['ERC1155Contract']>, ParentType, ContextType, RequireFields<QueryErc1155ContractArgs, 'id' | 'subgraphError'>>;
  erc1155Contracts?: Resolver<Array<ResolversTypes['ERC1155Contract']>, ParentType, ContextType, RequireFields<QueryErc1155ContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Creator?: Resolver<Maybe<ResolversTypes['ERC1155Creator']>, ParentType, ContextType, RequireFields<QueryErc1155CreatorArgs, 'id' | 'subgraphError'>>;
  erc1155Creators?: Resolver<Array<ResolversTypes['ERC1155Creator']>, ParentType, ContextType, RequireFields<QueryErc1155CreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Token?: Resolver<Maybe<ResolversTypes['ERC1155Token']>, ParentType, ContextType, RequireFields<QueryErc1155TokenArgs, 'id' | 'subgraphError'>>;
  erc1155Tokens?: Resolver<Array<ResolversTypes['ERC1155Token']>, ParentType, ContextType, RequireFields<QueryErc1155TokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Transfer?: Resolver<Maybe<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<QueryErc1155TransferArgs, 'id' | 'subgraphError'>>;
  erc1155Transfers?: Resolver<Array<ResolversTypes['ERC1155Transfer']>, ParentType, ContextType, RequireFields<QueryErc1155TransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id' | 'subgraphError'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'first' | 'skip' | 'subgraphError'>>;
  marketEvent721?: Resolver<Maybe<ResolversTypes['MarketEvent721']>, ParentType, ContextType, RequireFields<QueryMarketEvent721Args, 'id' | 'subgraphError'>>;
  marketEvent721S?: Resolver<Array<ResolversTypes['MarketEvent721']>, ParentType, ContextType, RequireFields<QueryMarketEvent721SArgs, 'first' | 'skip' | 'subgraphError'>>;
  marketEvent1155?: Resolver<Maybe<ResolversTypes['MarketEvent1155']>, ParentType, ContextType, RequireFields<QueryMarketEvent1155Args, 'id' | 'subgraphError'>>;
  marketEvent1155S?: Resolver<Array<ResolversTypes['MarketEvent1155']>, ParentType, ContextType, RequireFields<QueryMarketEvent1155SArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_MetaArgs>>;
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionAccountArgs, 'id' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionAccountsArgs, 'first' | 'skip' | 'subgraphError'>>;
  block?: SubscriptionResolver<Maybe<ResolversTypes['Block']>, "block", ParentType, ContextType, RequireFields<SubscriptionBlockArgs, 'id' | 'subgraphError'>>;
  blocks?: SubscriptionResolver<Array<ResolversTypes['Block']>, "blocks", ParentType, ContextType, RequireFields<SubscriptionBlocksArgs, 'first' | 'skip' | 'subgraphError'>>;
  creator?: SubscriptionResolver<Maybe<ResolversTypes['Creator']>, "creator", ParentType, ContextType, RequireFields<SubscriptionCreatorArgs, 'id' | 'subgraphError'>>;
  creators?: SubscriptionResolver<Array<ResolversTypes['Creator']>, "creators", ParentType, ContextType, RequireFields<SubscriptionCreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Contract?: SubscriptionResolver<Maybe<ResolversTypes['ERC721Contract']>, "erc721Contract", ParentType, ContextType, RequireFields<SubscriptionErc721ContractArgs, 'id' | 'subgraphError'>>;
  erc721Contracts?: SubscriptionResolver<Array<ResolversTypes['ERC721Contract']>, "erc721Contracts", ParentType, ContextType, RequireFields<SubscriptionErc721ContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Creator?: SubscriptionResolver<Maybe<ResolversTypes['ERC721Creator']>, "erc721Creator", ParentType, ContextType, RequireFields<SubscriptionErc721CreatorArgs, 'id' | 'subgraphError'>>;
  erc721Creators?: SubscriptionResolver<Array<ResolversTypes['ERC721Creator']>, "erc721Creators", ParentType, ContextType, RequireFields<SubscriptionErc721CreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Token?: SubscriptionResolver<Maybe<ResolversTypes['ERC721Token']>, "erc721Token", ParentType, ContextType, RequireFields<SubscriptionErc721TokenArgs, 'id' | 'subgraphError'>>;
  erc721Tokens?: SubscriptionResolver<Array<ResolversTypes['ERC721Token']>, "erc721Tokens", ParentType, ContextType, RequireFields<SubscriptionErc721TokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc721Transfer?: SubscriptionResolver<Maybe<ResolversTypes['ERC721Transfer']>, "erc721Transfer", ParentType, ContextType, RequireFields<SubscriptionErc721TransferArgs, 'id' | 'subgraphError'>>;
  erc721Transfers?: SubscriptionResolver<Array<ResolversTypes['ERC721Transfer']>, "erc721Transfers", ParentType, ContextType, RequireFields<SubscriptionErc721TransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Balance?: SubscriptionResolver<Maybe<ResolversTypes['ERC1155Balance']>, "erc1155Balance", ParentType, ContextType, RequireFields<SubscriptionErc1155BalanceArgs, 'id' | 'subgraphError'>>;
  erc1155Balances?: SubscriptionResolver<Array<ResolversTypes['ERC1155Balance']>, "erc1155Balances", ParentType, ContextType, RequireFields<SubscriptionErc1155BalancesArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Contract?: SubscriptionResolver<Maybe<ResolversTypes['ERC1155Contract']>, "erc1155Contract", ParentType, ContextType, RequireFields<SubscriptionErc1155ContractArgs, 'id' | 'subgraphError'>>;
  erc1155Contracts?: SubscriptionResolver<Array<ResolversTypes['ERC1155Contract']>, "erc1155Contracts", ParentType, ContextType, RequireFields<SubscriptionErc1155ContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Creator?: SubscriptionResolver<Maybe<ResolversTypes['ERC1155Creator']>, "erc1155Creator", ParentType, ContextType, RequireFields<SubscriptionErc1155CreatorArgs, 'id' | 'subgraphError'>>;
  erc1155Creators?: SubscriptionResolver<Array<ResolversTypes['ERC1155Creator']>, "erc1155Creators", ParentType, ContextType, RequireFields<SubscriptionErc1155CreatorsArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Token?: SubscriptionResolver<Maybe<ResolversTypes['ERC1155Token']>, "erc1155Token", ParentType, ContextType, RequireFields<SubscriptionErc1155TokenArgs, 'id' | 'subgraphError'>>;
  erc1155Tokens?: SubscriptionResolver<Array<ResolversTypes['ERC1155Token']>, "erc1155Tokens", ParentType, ContextType, RequireFields<SubscriptionErc1155TokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  erc1155Transfer?: SubscriptionResolver<Maybe<ResolversTypes['ERC1155Transfer']>, "erc1155Transfer", ParentType, ContextType, RequireFields<SubscriptionErc1155TransferArgs, 'id' | 'subgraphError'>>;
  erc1155Transfers?: SubscriptionResolver<Array<ResolversTypes['ERC1155Transfer']>, "erc1155Transfers", ParentType, ContextType, RequireFields<SubscriptionErc1155TransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  event?: SubscriptionResolver<Maybe<ResolversTypes['Event']>, "event", ParentType, ContextType, RequireFields<SubscriptionEventArgs, 'id' | 'subgraphError'>>;
  events?: SubscriptionResolver<Array<ResolversTypes['Event']>, "events", ParentType, ContextType, RequireFields<SubscriptionEventsArgs, 'first' | 'skip' | 'subgraphError'>>;
  marketEvent721?: SubscriptionResolver<Maybe<ResolversTypes['MarketEvent721']>, "marketEvent721", ParentType, ContextType, RequireFields<SubscriptionMarketEvent721Args, 'id' | 'subgraphError'>>;
  marketEvent721S?: SubscriptionResolver<Array<ResolversTypes['MarketEvent721']>, "marketEvent721S", ParentType, ContextType, RequireFields<SubscriptionMarketEvent721SArgs, 'first' | 'skip' | 'subgraphError'>>;
  marketEvent1155?: SubscriptionResolver<Maybe<ResolversTypes['MarketEvent1155']>, "marketEvent1155", ParentType, ContextType, RequireFields<SubscriptionMarketEvent1155Args, 'id' | 'subgraphError'>>;
  marketEvent1155S?: SubscriptionResolver<Array<ResolversTypes['MarketEvent1155']>, "marketEvent1155S", ParentType, ContextType, RequireFields<SubscriptionMarketEvent1155SArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptionTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptionTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<TransactionEventsArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Block_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = {
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Meta_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = {
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Block?: BlockResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Creator?: CreatorResolvers<ContextType>;
  ERC721Contract?: Erc721ContractResolvers<ContextType>;
  ERC721Creator?: Erc721CreatorResolvers<ContextType>;
  ERC721Token?: Erc721TokenResolvers<ContextType>;
  ERC721Transfer?: Erc721TransferResolvers<ContextType>;
  ERC1155Balance?: Erc1155BalanceResolvers<ContextType>;
  ERC1155Contract?: Erc1155ContractResolvers<ContextType>;
  ERC1155Creator?: Erc1155CreatorResolvers<ContextType>;
  ERC1155Token?: Erc1155TokenResolvers<ContextType>;
  ERC1155Transfer?: Erc1155TransferResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  MarketEvent721?: MarketEvent721Resolvers<ContextType>;
  MarketEvent1155?: MarketEvent1155Resolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
};


<<<<<<< HEAD
export const GetCollectionsDataDocument = gql`
    query GetCollectionsData($collectionAddress: String) {
  marketEvent1155S(where: {address: $collectionAddress}) {
    address
    netPrice
    price
    quoteToken
    to
    nftId {
      contract {
        id
      }
    }
    event
  }
  marketEvent721S(where: {address: $collectionAddress}) {
    id
    nftId {
      contract {
        id
      }
    }
    address
    price
    quoteToken
    event
    to
  }
}
    `;
export const GetCollectionHoldersDocument = gql`
    query GetCollectionHolders($collectionAddress: String) {
  erc1155Balances(where: {contract_: {id: $collectionAddress}}) {
    id
    value
    contract {
      id
    }
    account {
      id
    }
  }
}
    `;
export const GetCollectionTokensDocument = gql`
    query GetCollectionTokens($collectionAddress: String) {
  erc1155Tokens(where: {contract_: {id: $collectionAddress}}) {
    id
    balances {
      value
      account {
        id
      }
      contract {
        id
      }
    }
  }
  erc721Tokens(where: {contract_: {id: $collectionAddress}}) {
    id
    owner {
      id
    }
=======
export const GetErc1155ContractsDocument = gql`
    query getERC1155Contracts {
  erc1155Contracts {
    txCreation
    symbol
    name
    id
  }
}
    `;
export const GetErc721ContractsDocument = gql`
    query getERC721Contracts {
  erc721Contracts {
    txCreation
    symbol
    name
    id
    supportsMetadata
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
  }
}
    `;
export const GetNfTsHistory721Document = gql`
    query GetNFTsHistory721($minPrice: BigInt, $maxPrice: BigInt, $event: SellStatus) {
  marketEvent721S(
    where: {price_gte: $minPrice, price_lte: $maxPrice, event: $event}
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    event
    nftId {
      id
    }
    price
    to
    from
  }
}
    `;
export const GetNfTsHistory1155Document = gql`
    query GetNFTsHistory1155($minPrice: BigInt, $maxPrice: BigInt, $event: SellStatus) {
  marketEvent1155S(
    where: {price_gte: $minPrice, price_lte: $maxPrice, event: $event}
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    event
    nftId {
      id
    }
    price
    to
    from
  }
}
    `;
export const GetOneNftSellInfoDocument = gql`
    query GetOneNFTSellInfo($nftId: String!) {
  marketEvent1155S(
    where: {nftId_contains: $nftId}
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    event
    nftId {
      id
    }
    price
    to
    from
  }
  marketEvent721S(
    where: {nftId_contains: $nftId}
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    event
    nftId {
      id
    }
    price
    to
    from
  }
}
    `;
export const GetNfTwithAccountIdDocument = gql`
    query getNFTwithAccountID($id: ID!) {
  account(id: $id) {
    id
    ERC721tokens {
      uri
      txCreation
      id
    }
    ERC1155balances {
      valueExact
      value
      id
      token {
        id
        txCreation
        uri
      }
    }
  }
}
    `;
export const GetStatusErc1155SDocument = gql`
    query getStatusERC1155S {
  marketEvent1155S {
    txHash
    to
    timestamp
    quoteToken
    price
    netPrice
    metadata
    id
    from
    event
    amounts
    address
    nftId {
      id
      txCreation
      uri
    }
  }
}
    `;
export const GetStatusErc721SDocument = gql`
    query getStatusERC721S {
  marketEvent721S {
    txHash
    to
    timestamp
    quoteToken
    price
    id
    from
    event
    address
    netPrice
    metadata
    nftId {
      uri
      txCreation
      id
    }
<<<<<<< HEAD
    
  }
}
    `;
  
    export const GetErc1155ContractsDocument = gql`
    query getERC1155Contracts {
  erc1155Contracts {
    txCreation
    symbol
    name
    id
  }
}
    `;
export const GetErc721ContractsDocument = gql`
    query getERC721Contracts {
  erc721Contracts {
    txCreation
    symbol
    name
    id
    supportsMetadata
=======
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
<<<<<<< HEAD
    GetCollectionsData(variables?: GetCollectionsDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCollectionsDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCollectionsDataQuery>(GetCollectionsDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCollectionsData', 'query');
    },
    GetCollectionHolders(variables?: GetCollectionHoldersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCollectionHoldersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCollectionHoldersQuery>(GetCollectionHoldersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCollectionHolders', 'query');
    },
    GetCollectionTokens(variables?: GetCollectionTokensQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCollectionTokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCollectionTokensQuery>(GetCollectionTokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCollectionTokens', 'query');
=======
    getERC1155Contracts(variables?: GetErc1155ContractsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetErc1155ContractsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetErc1155ContractsQuery>(GetErc1155ContractsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getERC1155Contracts', 'query');
    },
    getERC721Contracts(variables?: GetErc721ContractsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetErc721ContractsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetErc721ContractsQuery>(GetErc721ContractsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getERC721Contracts', 'query');
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
    },
    GetNFTsHistory721(variables?: GetNfTsHistory721QueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNfTsHistory721Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNfTsHistory721Query>(GetNfTsHistory721Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNFTsHistory721', 'query');
    },
    GetNFTsHistory1155(variables?: GetNfTsHistory1155QueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNfTsHistory1155Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNfTsHistory1155Query>(GetNfTsHistory1155Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNFTsHistory1155', 'query');
    },
    GetOneNFTSellInfo(variables: GetOneNftSellInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOneNftSellInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOneNftSellInfoQuery>(GetOneNftSellInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOneNFTSellInfo', 'query');
    },
    getNFTwithAccountID(variables: GetNfTwithAccountIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNfTwithAccountIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNfTwithAccountIdQuery>(GetNfTwithAccountIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNFTwithAccountID', 'query');
    },
    getStatusERC1155S(variables?: GetStatusErc1155SQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetStatusErc1155SQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatusErc1155SQuery>(GetStatusErc1155SDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStatusERC1155S', 'query');
    },
    getStatusERC721S(variables?: GetStatusErc721SQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetStatusErc721SQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatusErc721SQuery>(GetStatusErc721SDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStatusERC721S', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
<<<<<<< HEAD
export type GetCollectionsDataQueryVariables = Exact<{
  collectionAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionsDataQuery = { __typename?: 'Query', marketEvent1155S: Array<{ __typename?: 'MarketEvent1155', address?: string | null, netPrice?: any | null, price?: any | null, quoteToken?: string | null, to?: string | null, event: SellStatus, nftId?: { __typename?: 'ERC1155Token', contract: { __typename?: 'ERC1155Contract', id: string } } | null }>, marketEvent721S: Array<{ __typename?: 'MarketEvent721', id: string, address: string, price?: any | null, quoteToken?: string | null, event: SellStatus, to?: string | null, nftId: { __typename?: 'ERC721Token', contract: { __typename?: 'ERC721Contract', id: string } } }> };

export type GetCollectionHoldersQueryVariables = Exact<{
  collectionAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionHoldersQuery = { __typename?: 'Query', erc1155Balances: Array<{ __typename?: 'ERC1155Balance', id: string, value: any, contract?: { __typename?: 'ERC1155Contract', id: string } | null, account?: { __typename?: 'Account', id: string } | null }> };

export type GetCollectionTokensQueryVariables = Exact<{
  collectionAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionTokensQuery = { __typename?: 'Query', erc1155Tokens: Array<{ __typename?: 'ERC1155Token', id: string, balances: Array<{ __typename?: 'ERC1155Balance', value: any, account?: { __typename?: 'Account', id: string } | null, contract?: { __typename?: 'ERC1155Contract', id: string } | null }> }>, erc721Tokens: Array<{ __typename?: 'ERC721Token', id: string, owner: { __typename?: 'Account', id: string } }> };
=======
export type GetErc1155ContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetErc1155ContractsQuery = { __typename?: 'Query', erc1155Contracts: Array<{ __typename?: 'ERC1155Contract', txCreation: string, symbol?: string | null, name?: string | null, id: string }> };

export type GetErc721ContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetErc721ContractsQuery = { __typename?: 'Query', erc721Contracts: Array<{ __typename?: 'ERC721Contract', txCreation: string, symbol?: string | null, name?: string | null, id: string, supportsMetadata?: boolean | null }> };
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)

export type GetNfTsHistory721QueryVariables = Exact<{
  minPrice?: InputMaybe<Scalars['BigInt']['input']>;
  maxPrice?: InputMaybe<Scalars['BigInt']['input']>;
  event?: InputMaybe<SellStatus>;
}>;


export type GetNfTsHistory721Query = { __typename?: 'Query', marketEvent721S: Array<{ __typename?: 'MarketEvent721', id: string, event: SellStatus, price?: any | null, to?: string | null, from: string, nftId: { __typename?: 'ERC721Token', id: string } }> };

export type GetNfTsHistory1155QueryVariables = Exact<{
  minPrice?: InputMaybe<Scalars['BigInt']['input']>;
  maxPrice?: InputMaybe<Scalars['BigInt']['input']>;
  event?: InputMaybe<SellStatus>;
}>;


export type GetNfTsHistory1155Query = { __typename?: 'Query', marketEvent1155S: Array<{ __typename?: 'MarketEvent1155', id: string, event: SellStatus, price?: any | null, to?: string | null, from?: string | null, nftId?: { __typename?: 'ERC1155Token', id: string } | null }> };

export type GetOneNftSellInfoQueryVariables = Exact<{
  nftId: Scalars['String']['input'];
}>;


export type GetOneNftSellInfoQuery = { __typename?: 'Query', marketEvent1155S: Array<{ __typename?: 'MarketEvent1155', id: string, event: SellStatus, price?: any | null, to?: string | null, from?: string | null, nftId?: { __typename?: 'ERC1155Token', id: string } | null }>, marketEvent721S: Array<{ __typename?: 'MarketEvent721', id: string, event: SellStatus, price?: any | null, to?: string | null, from: string, nftId: { __typename?: 'ERC721Token', id: string } }> };

<<<<<<< HEAD
export type GetCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, type?: string | null, txCreation: string, symbol?: string | null, parent?: string | null, owner?: string | null, name?: string | null, minters?: Array<string> | null, meta?: string | null, features?: string | null, bestSellOrder?: string | null, bestBidOrder?: string | null }> };

export type GetErc1155ContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetErc1155ContractsQuery = { __typename?: 'Query', erc1155Contracts: Array<{ __typename?: 'ERC1155Contract', txCreation: string, symbol?: string | null, name?: string | null, id: string }> };

export type GetErc721ContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetErc721ContractsQuery = { __typename?: 'Query', erc721Contracts: Array<{ __typename?: 'ERC721Contract', txCreation: string, symbol?: string | null, name?: string | null, id: string, supportsMetadata?: boolean | null }> };

=======
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
export type GetNfTwithAccountIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNfTwithAccountIdQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: string, ERC721tokens: Array<{ __typename?: 'ERC721Token', uri?: string | null, txCreation: string, id: string }>, ERC1155balances: Array<{ __typename?: 'ERC1155Balance', valueExact: any, value: any, id: string, token: { __typename?: 'ERC1155Token', id: string, txCreation: string, uri?: string | null } }> } | null };

export type GetStatusErc1155SQueryVariables = Exact<{ [key: string]: never; }>;


<<<<<<< HEAD
export type GetStatusErc1155SQuery = { __typename?: 'Query', marketEvent1155S: Array<{ __typename?: 'MarketEvent1155', txHash: string, to?: string | null, timestamp: any, quoteToken?: string | null, price?: any | null, netPrice?: any | null, metadata?: string | null, id: string, from?: string | null, event: string, amounts: any, address?: string | null, nftId?: { __typename?: 'ERC1155Token', id: string, txCreation: string, uri?: string | null } | null }> };
=======
export type GetStatusErc1155SQuery = { __typename?: 'Query', marketEvent1155S: Array<{ __typename?: 'MarketEvent1155', txHash: string, to?: string | null, timestamp: any, quoteToken?: string | null, price?: any | null, netPrice?: any | null, metadata?: string | null, id: string, from?: string | null, event: SellStatus, amounts: any, address?: string | null, nftId?: { __typename?: 'ERC1155Token', id: string, txCreation: string, uri?: string | null } | null }> };
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)

export type GetStatusErc721SQueryVariables = Exact<{ [key: string]: never; }>;


<<<<<<< HEAD
export type GetStatusErc721SQuery = { __typename?: 'Query', marketEvent721S: Array<{ __typename?: 'MarketEvent721', txHash: string, to?: string | null, timestamp: any, quoteToken?: string | null, price?: any | null, id: string, from: string, event: string, address: string, netPrice?: any | null, metadata?: string | null, nftId: { __typename?: 'ERC721Token', uri?: string | null, txCreation: string, id: string } }> };
=======
export type GetStatusErc721SQuery = { __typename?: 'Query', marketEvent721S: Array<{ __typename?: 'MarketEvent721', txHash: string, to?: string | null, timestamp: any, quoteToken?: string | null, price?: any | null, id: string, from: string, event: SellStatus, address: string, netPrice?: any | null, metadata?: string | null, nftId: { __typename?: 'ERC721Token', uri?: string | null, txCreation: string, id: string } }> };
>>>>>>> ad0fa91 (Update Optimize Code Get NFT By User)
