import { Prisma, User, Collection } from '@prisma/client';
const creatorSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  avatar: true,
  username: true,
  publicKey: true,
  accountStatus: true,
  verifyEmail: true,
  signer: true,
};

const CollectionSelect: Prisma.CollectionSelect = {
  id: true,
  txCreationHash: true,
  name: true,
  status: true,
  type: true,
  address: true,
  isVerified: true,
  metadata: true,
  shortUrl: true,
  symbol: true,
  description: true,
  categoryId: true,
  createdAt: true,
  avatar: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};

const marketplaceSelect: Prisma.MarketplaceStatusSelect = {
  price: true,
  priceWei: true,
  netPrice: true,
  netPriceWei: true,
  quantity: true,
  quoteToken: true,
  operationId: true,
  operation: true,
  askId: true,
  event: true,
};

const nftSelect: Prisma.NFTSelect = {
  id: true,
  u2uId: true,
  description: true,
  name: true,
  nameSlug: true,
  image: true,
  animationUrl: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  tokenUri: true,
  txCreationHash: true,
  collectionId: true,
  creatorId: true,
  creator: {
    select: creatorSelect,
  },
  collection: {
    select: CollectionSelect,
  },
  traits: true,
};

const nftSelectOwner: Prisma.NFTSelect = {
  id: true,
  name: true,
  traits: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  tokenUri: true,
  txCreationHash: true,
  creator: {
    select: creatorSelect,
  },
  collection: {
    select: CollectionSelect,
  },
};

const nftOwnerShip: Prisma.UserNFTSelect = {
  quantity: true,
  nft: {
    select: nftSelectOwner,
  },
};

const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  avatar: true,
  username: true,
  publicKey: true,
  accountStatus: true,
  verifyEmail: true,
  signer: true,
};

const userSelectFull = (currentUserId: string): Prisma.UserSelect => {
  return {
    id: true,
    email: true,
    avatar: true,
    username: true,
    signature: true,
    signedMessage: true,
    signDate: true,
    signer: true,
    publicKey: true,
    acceptedTerms: true,
    createdAt: true,
    updatedAt: true,
    bio: true,
    facebookLink: true,
    twitterLink: true,
    telegramLink: true,
    shortLink: true,
    discordLink: true,
    webURL: true,
    coverImage: true,
    followers: true,
    following: true,
    accountStatus: true,
    verifyEmail: true,
    ...(currentUserId
      ? {
          user: {
            select: {
              isFollow: true,
            },
            where: {
              followerId: currentUserId,
            },
          },
        }
      : {}),
  };
};

const projectSelect: Prisma.ProjectSelect = {
  id: true,
  idOnchain: true,
  name: true,
  banner: true,
  website: true,
  telegram: true,
  facebook: true,
  instagram: true,
  discord: true,
  shortLink: true,
  organization: true,
  description: true,
  isActivated: true,
  collection: true,
  details: true,
  twitter: true,
  logo: true,
};

const collectionSelect: Prisma.CollectionSelect = {
  id: true,
  txCreationHash: true,
  name: true,
  address: true,
  metadata: true,
  shortUrl: true,
  symbol: true,
  description: true,
  status: true,
  type: true,
  categoryId: true,
  createdAt: true,
  avatar: true,
  coverImage: true,
  updatedAt: true,
  projectId: true,
  nameSlug: true,
  isU2U: true,
  isVerified: true,
  floorPrice: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};

export {
  creatorSelect,
  CollectionSelect,
  marketplaceSelect,
  nftSelect,
  nftOwnerShip,
  userSelect,
  userSelectFull,
  projectSelect,
  collectionSelect,
};
