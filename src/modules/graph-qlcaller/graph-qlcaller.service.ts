import { Injectable } from '@nestjs/common';
import { CreateGraphQlcallerDto } from './dto/create-graph-qlcaller.dto';
import { UpdateGraphQlcallerDto } from './dto/update-graph-qlcaller.dto';
import { getSdk, GetNfTsHistory721QueryVariables, GetNfTsHistory1155QueryVariables, SellStatus, GetNfTsHistory721Query, GetNfTsHistory1155Query, GetOneNftSellInfoQueryVariables } from '../../generated/graphql'
import { GraphQLClient, gql } from 'graphql-request';
@Injectable()
export class GraphQlcallerService {
  private readonly endpoint = process.env.SUBGRAPH_URL;
  private graphqlClient: GraphQLClient;

  constructor() {
    this.graphqlClient = new GraphQLClient(this.endpoint);

  }

  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }

  async getNFTsHistory721(minPrice?, maxPrice?, event?: SellStatus) {
    let whereConditions = [];
    let variables = {};

    // Add conditions based on parameters
    if (minPrice !== undefined && minPrice !== null) {
      whereConditions.push('price_gte: $minPrice');
      variables['minPrice'] = minPrice;
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      whereConditions.push('price_lte: $maxPrice');
      variables['maxPrice'] = maxPrice;
    }
    if (event !== undefined && event !== null) {
      whereConditions.push('event: $event');
      variables['event'] = event;
    }

    // Construct the query
    const query = gql`
      query GetNFTsHistory721($minPrice: BigInt, $maxPrice: BigInt, $event: SellStatus) {
        marketEvent721S(
          where: {${whereConditions.join(', ')}}
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

    // Execute the query with dynamic variables
    return this.graphqlClient.request(query, variables) as unknown as GetNfTsHistory721Query;
  }

  async getNFTsHistory1155(minPrice?, maxPrice?, event?: SellStatus) {
    let whereConditions = [];
    let variables = {};

    // Add conditions based on parameters
    if (minPrice !== undefined && minPrice !== null) {
      whereConditions.push('price_gte: $minPrice');
      variables['minPrice'] = minPrice;
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      whereConditions.push('price_lte: $maxPrice');
      variables['maxPrice'] = maxPrice;
    }
    if (event !== undefined && event !== null) {
      whereConditions.push('event: $event');
      variables['event'] = event;
    }

    // Construct the query
    const query = gql`
      query GetNFTsHistory1155($minPrice: BigInt, $maxPrice: BigInt, $event: SellStatus) {
        marketEvent1155S(
          where: {${whereConditions.join(', ')}}
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

    // Execute the query with dynamic variables
    return this.graphqlClient.request(query, variables) as unknown as GetNfTsHistory1155Query;
  } 

  async getOneNFTSellStatus(nftId) {
    const client = this.getGraphqlClient();
    const sdk = getSdk(client);
    console.log('let see: ', nftId)
    const variables: GetOneNftSellInfoQueryVariables = { nftId };
    const response = sdk.GetOneNFTSellInfo(variables);
    return response;
  }
}
