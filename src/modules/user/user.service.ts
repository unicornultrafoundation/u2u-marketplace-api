import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { GetAllUser } from './dto/get-all-user.dto';
import { validate as isValidUUID } from 'uuid';
import { FindAllProjectDto } from '../launchpad/dto/find-all-project.dto';
import { findProjectsUserSubscribe } from '../launchpad/dto/find-project.dto';
import { ListProjectEntity } from './entities/project.entity';
import { UserEntity } from './entities/user.entity';
import { ActivityService } from '../nft/activity.service';
import { GetActivityBase } from './dto/activity-user.dto';
import { Redis } from 'src/database';
import { SendVerifyEmailDto, VerifyEmailDto } from './dto/verify-email.dto';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { GraphQLClient, gql } from 'graphql-request';
import {
  Query,
  getSdk,
  GetTransferNftQueryVariables,
} from '../../generated/graphql';
import SecureUtil from '../../commons/Secure.common';
import PaginationCommon from 'src/commons/HasNext.common';
import {
  userSelectFull,
  projectSelect,
} from '../../commons/definitions/Constraint.Object';
interface UserRedisinterface {
  timestamp: string;
  email: string;
  userId: string;
  verifyToken: string;
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private activetiService: ActivityService,
  ) {}

  private readonly secretKeyConfirm = process.env.MAIL_KEY_CONFIRM;
  private readonly tokenExpirationTime = 60;
  private readonly redisExpirationTime = 60;
  private readonly endpoint = process.env.SUBGRAPH_URL;
  private client = this.getGraphqlClient();

  private getGraphqlClient() {
    return new GraphQLClient(this.endpoint);
  }

  // Remove few prop secret
  private minifyUserObject(params: any): any {
    const { user = {} } = params;
    const propertiesToRemove = ['signature', 'signer', 'signedMessage', 'user'];
    const minifiedUser = {
      ...params,
      isFollowed: user && user.length > 0 ? user[0].isFollow : false,
    };
    for (const property in minifiedUser) {
      if (propertiesToRemove.includes(property)) {
        delete minifiedUser[property];
      }
    }
    return minifiedUser;
  }

  async findByPublicKey(publicKey: string): Promise<any> {
    const account = await this.prisma.user.findFirst({
      where: {
        publicKey: publicKey,
      },
    });
    if (!account) {
      return null;
    }
    return account;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findOneByWallet(address: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        signer: address.toLowerCase(),
      },
    });
    if (!user) {
      throw new NotFoundException(`User #${address} not found`);
    }
    return user;
  }

  async findAll(
    filter: GetAllUser,
    currentUser: User,
  ): Promise<PagingResponseHasNext<any>> {
    const currentUserId = currentUser?.id;
    // const limit = (filter.limit || 12) as number;
    // const cursor = filter.cursor;
    // @ts-ignore
    // const take: number = limit && limit > 0 ? parseInt(limit) + 1 : 13;
    const whereCondition: any = {
      ...(filter.search
        ? {
            OR: [
              {
                username: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
              {
                signer: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
              {
                shortLink: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
              // Add more fields as needed
            ],
          }
        : {}),
      username: {
        not: null,
      },
    };

    const usersWithFollowStatus = await this.prisma.user.findMany({
      orderBy: {
        createdAt: filter.order,
      },
      where: whereCondition,
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
      select: userSelectFull(currentUserId),
    });

    // const total = await this.prisma.user.count({
    //   where: whereCondition,
    // });
    const usersWithFollowStatusAndPaging = usersWithFollowStatus.map(
      ({ user, ...rest }) => ({
        ...rest,
        isFollowed: user && user.length > 0 ? user[0].isFollow : false,
      }),
    );
    // let nextCursor: string | null = null;
    // if (users.length > limit) {
    //   const nextUser = users.pop();
    //   nextCursor = nextUser.id;
    // }
    // return { users, nextCursor };
    const hasNext = await PaginationCommon.hasNextPage(
      filter.page,
      filter.limit,
      'user',
      whereCondition,
    );
    return {
      data: usersWithFollowStatusAndPaging,
      paging: {
        hasNext,
        page: filter.page,
        limit: filter.limit,
      },
    };
  }

  async getProfileWithShortLinkOrIdUser(input: string, user: any) {
    try {
      const currentUserId = user?.id;
      // const result: any = {};
      let isUuid = true;
      if (!isValidUUID(input)) {
        isUuid = false;
      }

      const result = await this.prisma.user.findFirst({
        where: {
          ...(isUuid
            ? { id: input }
            : {
                OR: [
                  { shortLink: { equals: input, mode: 'insensitive' } },
                  {
                    signer: {
                      equals: input.toLowerCase(),
                      mode: 'insensitive',
                    },
                  },
                ],
              }),
        },
        select: userSelectFull(currentUserId),
      });

      if (!result) {
        throw new NotFoundException();
      }

      const response =
        !currentUserId || currentUserId !== result.id
          ? this.minifyUserObject(result)
          : result;

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(input: UpdateUserDto, user: User) {
    try {
      const { email, username, shortLink } = input;
      // Check for existing email
      if (email) {
        const checkExistEmail = await this.checkUserExistence(
          'email',
          email,
          user.id,
        );
        if (checkExistEmail) {
          throw new Error('Email already exists');
        }
      }
      // Check for existing username
      if (username) {
        const checkExistUsername = await this.checkUserExistence(
          'username',
          username,
          user.id,
        );
        if (checkExistUsername) {
          throw new Error('Username already exists');
        }
      }

      // Check for existing short link
      if (shortLink) {
        const checkExistShortLink = await this.checkUserExistence(
          'shortLink',
          shortLink,
          user.id,
        );
        if (checkExistShortLink) {
          throw new Error('Short Link already exists');
        }
      }

      const updateData = {
        email: input.email,
        username: input.username,
        acceptedTerms: input.acceptedTerms,
        bio: input.bio,
        facebookLink: input.facebookLink,
        twitterLink: input.twitterLink,
        telegramLink: input.telegramLink,
        discordLink: input.discordLink,
        webURL: input.webURL,
        coverImage: input.coverImage,
        shortLink: input.shortLink,
        avatar: input.avatar,
        verifyEmail: input.email && input.email === user.email,
        accountStatus:
          !input.twitterLink ||
          !input.bio ||
          !input.shortLink ||
          !input.avatar ||
          input.email !== user.email
            ? false
            : undefined,
      };

      // Remove shortLink if not provided
      if (!shortLink) {
        delete updateData.shortLink;
      }
      return await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: updateData,
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkUserExistence(field: string, value: string, userId: string) {
    const condition = {
      id: { not: userId },
      [field]: value,
    };

    const existingUser = await this.prisma.user.findFirst({
      where: { AND: [condition] },
    });

    return !!existingUser;
  }
  async getProjectByUser(
    query: findProjectsUserSubscribe,
    userId: string,
  ): Promise<ListProjectEntity> {
    try {
      const whereRounds: Prisma.ProjectRoundWhereInput = {};
      if (query.start) {
        whereRounds.start = { gte: new Date(query.start) };
      }

      if (query.end) {
        whereRounds.end = { lte: new Date(query.end) };
      }

      const user = await this.prisma.user.findFirst({
        where: {
          signer: userId.toLowerCase(),
        },
      });
      if (!user) {
        throw new NotFoundException('Subscriber not found');
      }
      const result = await this.prisma.userProject.findMany({
        where: {
          AND: [
            {
              userId: user.id,
            },
            {
              projectId: query.projectId,
            },
          ],
        },
        include: {
          project: {
            select: {
              ...projectSelect,
              rounds: {
                where: whereRounds,
                include: {
                  round: true,
                },
              },
            },
          },
        },
      });
      const response = result.map((subcriber) => {
        const { project } = subcriber;
        return {
          ...subcriber,
          project: {
            ...project,
            rounds: project.rounds.map((round) => ({
              ...round,
              ...round.round,
            })),
          },
        };
      });

      const res = this.formatData(response);
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async findActivityNFT(input: GetActivityBase) {
    try {
      const { user, page, limit, type } = input;
      const resultUser = await this.getUser(user);

      const or = [{ to: resultUser?.signer }, { from: resultUser?.signer }];
      const blocks = await this.activetiService.fetchActivityFromGraph({
        or,
        page,
        limit,
        type,
      });
      const result = await this.activetiService.processActivityUserData(blocks);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(user: any) {
    try {
      if (isValidUUID(user)) {
        // If user is a valid UUID, search by ID
        const responseUser = await this.prisma.user.findFirst({
          where: { id: user },
        });
        return responseUser;
      } else {
        // If user is not a valid UUID, search by username or shortLink
        const responseUser = await this.prisma.user.findFirst({
          where: {
            OR: [{ username: user }, { shortLink: user }, { signer: user }],
          },
        });
        return responseUser;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  formatData(data) {
    if (data.length === 0) {
      throw new NotFoundException('User has not subscribed project');
    }
    const { userId, subscribeDate, stakingTotal, lastDateRecord, projectId } =
      data[0];
    const projects = data.map((item) => item?.project);

    return {
      userId,
      subscribeDate,
      stakingTotal,
      lastDateRecord,
      projectId,
      projects,
    };
  }

  async followUser(id: string, follower: User) {
    try {
      let isUuid = true;
      if (!isValidUUID(id)) {
        isUuid = false;
      }
      const user = await this.prisma.user.findFirst({
        where: {
          ...(isUuid ? { id } : { OR: [{ signer: id }, { shortLink: id }] }),
        },
      });
      if (!user) {
        throw new NotFoundException();
      }
      if (user.id == follower.id) {
        throw new Error('You cannot follow yourself');
      }
      const userFollowMatch = await this.prisma.userFollow.findFirst({
        where: {
          userId: user.id,
          followerId: follower.id,
        },
      });

      const existingFollow = await this.prisma.userFollow.upsert({
        where: {
          userId_followerId: {
            userId: user.id,
            followerId: follower.id,
          },
        },
        update: { isFollow: !userFollowMatch?.isFollow },
        create: {
          userId: user.id,
          followerId: follower.id,
          isFollow: true,
        },
      });

      const increment = !existingFollow.isFollow ? -1 : 1;
      // Followers
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          followers: {
            increment,
          },
        },
      });
      // Following
      await this.prisma.user.update({
        where: {
          id: follower.id,
        },
        data: {
          following: {
            increment,
          },
        },
      });

      return { isFollowed: existingFollow.isFollow };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async sendverifyEmail(input: SendVerifyEmailDto, user: User) {
    try {
      const { id } = user;
      const currentUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!currentUser) {
        throw new NotFoundException();
      }
      if (input.email !== currentUser.email) {
        throw new Error('Email is incorrect');
      }

      const redisData = await this.checkRecord(`${currentUser.signer}-Verify`);

      if (redisData !== null) {
        throw new Error('Please Resend After 60 Seconds!');
      } else {
        const verifyToken = this.generateTokenConfirm(
          currentUser.email,
          currentUser.username,
          currentUser.id,
        );
        await this.saveTokenConfirm(`${currentUser.signer}-Verify`, {
          timestamp: `${Math.floor(Date.now() / 1000)}`,
          email: input.email,
          verifyToken: verifyToken,
          userId: `${currentUser.id}`,
        });
        await Redis.publish('user-channel', {
          data: {
            isVerify: true,
            email: input.email,
            name: currentUser.username,
            id: currentUser.id,
            verifyToken: verifyToken,
          },
          process: 'email-verify',
        });
      }
      return true;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkVerifyEmail(input: VerifyEmailDto) {
    try {
      const validatie = this.verifyTokenConfirm(input.token);
      if (!validatie) {
        throw Error('Token is invalid');
      }
      const user = await this.prisma.user.findFirst({
        where: {
          id: validatie?.id,
        },
      });
      if (user.id != validatie?.id) {
        throw new Error('This email cannot be confirmed');
      }
      if (user && user?.verifyEmail) {
        throw new Error('This email has been verified');
      }
      const resultUpdate = await this.prisma.user.update({
        where: { id: validatie?.id },
        data: {
          verifyEmail: true,
        },
      });
      return resultUpdate;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkListVerify(user: User) {
    try {
      const listVerify = {};
      const client = this.getGraphqlClient();
      const sdk = getSdk(client);
      const variables: GetTransferNftQueryVariables = {
        id: user.signer,
      };
      const reponse = await sdk.getTransferNFT(variables);

      const nftTransfers =
        reponse?.erc1155Transfers?.length > 0 ||
        reponse?.erc721Transfers?.length > 0;

      if (!nftTransfers) {
        listVerify['ownerOrCreater'] = false;
      }
      const requiredFields = [
        'bio',
        'twitterLink',
        'username',
        'avatar',
        'verifyEmail',
      ];

      requiredFields.forEach((field) => {
        if (!user[field]) {
          listVerify[field] = false;
        }
      });
      if (Object.values(listVerify).some((value) => value === false)) {
        return { listVerify: listVerify, accountStatus: false };
      }

      if (user?.accountStatus == true) {
        throw new Error('Your account has been verified');
      }
      const resultGetVerify = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          accountStatus: true,
        },
      });

      // return resultGetVerify;
      return { listVerify: {}, accountStatus: resultGetVerify?.accountStatus };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  verifyTokenConfirm(token: string): any {
    try {
      const decodedToken = jwt.verify(
        token,
        this.secretKeyConfirm,
      ) as JwtPayload;

      // Check expiration time manually if needed
      if (decodedToken && decodedToken.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
        if (decodedToken.exp < currentTimestamp) {
          // Token has expired
          return null;
        }
      }
      return decodedToken;
    } catch (error) {
      return null; // Token verification failed
    }
  }

  generateTokenConfirm(email: string, name: string, id: string): string {
    // Set expiration time to 5 minutes
    const expirationTime = this.tokenExpirationTime;

    return jwt.sign({ email, name, id }, this.secretKeyConfirm, {
      expiresIn: expirationTime,
    });
  }

  async saveTokenConfirm(address: string, input: UserRedisinterface) {
    try {
      const result = await SecureUtil.storeObjectSession(
        address,
        input,
        this.redisExpirationTime,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async checkRecord(address: string) {
    try {
      const result = await SecureUtil.getSessionInfo(address);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
