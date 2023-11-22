import { Injectable } from '@nestjs/common';
import { CreateGraphQlcallerDto } from './dto/create-graph-qlcaller.dto';
import { UpdateGraphQlcallerDto } from './dto/update-graph-qlcaller.dto';
// import { getSdk, GetCollectionsQueryVariables } from '../../generated/graphql'
import { GraphQLClient } from 'graphql-request';
@Injectable()
export class GraphQlcallerService {
  private readonly endpoint = process.env.SUBGRAPH_URL;

  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }
  async getCollections(first: number) {
    // const client = this.getGraphqlClient();
    // const sdk = getSdk(client);
    // const variables: GetCollectionsQueryVariables = { first };
    try {
    //   const response = await sdk.GetCollections(variables);
      return
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }
  
  create(createGraphQlcallerDto: CreateGraphQlcallerDto) {
    return 'This action adds a new graphQlcaller';
  }

  findAll() {
    return `This action returns all graphQlcaller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graphQlcaller`;
  }

  update(id: number, updateGraphQlcallerDto: UpdateGraphQlcallerDto) {
    return `This action updates a #${id} graphQlcaller`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphQlcaller`;
  }
}
