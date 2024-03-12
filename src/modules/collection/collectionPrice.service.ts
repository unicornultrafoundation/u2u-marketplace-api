import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQlcallerService } from '../graph-qlcaller/graph-qlcaller.service';
import { SellStatus, GetRoyaltiesQuery } from 'src/generated/graphql';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Query } from '../../generated/graphql';
import { ZERO_ADDR } from 'src/constants/web3Const/messages';
import { GraphQLClient, gql } from 'graphql-request';
import { creatorSelect } from '../../commons/definitions/Constraint.Object';
@Injectable()
export class CollectionPriceService {
  constructor(
    private prisma: PrismaService,
    private readonly graphQL: GraphQlcallerService,
  ) {}
  async filterFloorPriceFromSubgraph(
    min?: string,
    max?: string,
  ): Promise<string[]> {
    const {
      marketEvent1155S: filterSelling1155,
      marketEvent721S: filterSelling721,
    } = await this.graphQL.getNFTSellStatus1({
      and: [
        { event: SellStatus.AskNew },
        { price_gte: min },
        { price_lte: max },
      ],
      // or: [{ from: filter.owner }, { to: filter.owner }],
    });
    const collectionsWithFloorPrice = this.getFloorPrices([
      ...filterSelling1155,
      ...filterSelling721,
    ]);
    const filteredCollection = this.filterFloorPrices(
      collectionsWithFloorPrice,
      min,
      max,
    );
    return filteredCollection.map((i) => i.contractId);
  }

  filterFloorPrices(floorPrices: any[], min?: string, max?: string) {
    return floorPrices.filter((item) => {
      const price = BigInt(item.floorPrice);
      if (min !== undefined && max !== undefined) {
        return price >= BigInt(min) && price <= BigInt(max);
      } else if (min !== undefined) {
        return price >= BigInt(min);
      } else if (max !== undefined) {
        return price <= BigInt(max);
      }
      return true;
    });
  }

  getFloorPrices(data) {
    // Create a set of unique contract IDs
    const contractIds = new Set(data.map((item) => item.nftId.contract.id));

    // Map each contract ID to its floor price
    const floorPrices = Array.from(contractIds).map((contractId) => {
      // Filter items by contract ID
      const items = data.filter(
        (item) => item.nftId.contract.id === contractId,
      );

      // Calculate the floor price for this contract
      const floorPrice = items.reduce((min, item) => {
        const price = BigInt(item.price);
        return price < min ? price : min;
      }, BigInt(items[0].price));

      return {
        contractId,
        floorPrice: floorPrice.toString(),
      };
    });

    return floorPrices;
  }
  async FetchRoyaltiesFromGraph(address: string) {
    try {
      const royaltiesRegistries =
        await this.graphQL.FetchRoyaltiesFromGraph(address);
      const result = await this.processUserData(royaltiesRegistries);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async processUserData(royaltiesRegistries: any[]) {
    try {
      const result = await Promise.all(
        royaltiesRegistries.map(async (item) => {
          const userResponse = await this.fetchUserData(item?.account);

          const user =
            item?.account !== ZERO_ADDR
              ? Object.keys(userResponse).length
                ? userResponse
                : { signer: item?.account }
              : { signer: item?.account };

          const newItem = {
            ...item,
            account: user,
          };
          return newItem;
        }),
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserData(signer: string) {
    try {
      return await this.prisma.user.findFirst({
        where: { signer },
        select: creatorSelect,
      });
    } catch (error) {
      console.error(`Error fetching user data for signer ${signer}:`, error);
      throw error; // You may want to handle or log the error accordingly
    }
  }
  async fetchUserData(signer: string) {
    if (signer !== ZERO_ADDR) {
      const response = await this.getUserData(signer);
      return response || {};
    }
    return signer;
  }
}
