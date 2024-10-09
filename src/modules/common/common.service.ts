import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { UpdateCommonDto } from './dto/update-common.dto';
import { create } from 'ipfs-http-client';
import OtherCommon from 'src/commons/Other.common';
import { response, Response } from 'express';
import * as fileType from 'file-type';
import { SearchAllDto } from './dto/search-all.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchAllType } from 'src/constants/searchType.enum';
import { Readable } from 'stream';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { Prisma } from '@prisma/client';
import PaginationCommon from 'src/commons/HasNext.common';
import {
  creatorSelect,
  CollectionSelect,
} from '../../commons/definitions/Constraint.Object';
import * as path from 'path';
import { AWSError, S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import CommonHepler from './helper/common.helper';
import { PINATA_GATEWAYS } from 'src/constants/Url.constant';

@Injectable()
export class CommonService {
  private ipfs;
  private readonly s3: S3;
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
  private AWS_REGION = process.env.AWS_REGION;
  constructor(private readonly prisma: PrismaService) {
    this.ipfs = create({
      host: process.env.IPFS_URL,
      port: parseInt(process.env.IPFS_PORT),
      protocol: process.env.IPFS_PROTOCOL,
    });
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: this.AWS_REGION,
    });
  }

  async searchAll(input: SearchAllDto) {
    if (!!input.text) {
      if (input.mode === SearchAllType.COLLECTION) {
        const whereConditionCollection: Prisma.CollectionWhereInput = {};
        whereConditionCollection.OR = [];
        whereConditionCollection.OR.push(
          {
            nameSlug: {
              contains: OtherCommon.stringToSlugSearch(input.text),
              mode: 'insensitive',
            },
          },
          {
            nameSlug: {
              contains: OtherCommon.stringToSlugSearch(input.text),
              mode: 'insensitive',
            },
          },
          {
            symbol: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
          {
            shortUrl: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
          {
            address: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
        );

        const dataCollection = await this.prisma.collection.findMany({
          where: whereConditionCollection,
          include: {
            creators: {
              select: {
                userId: true,
                user: {
                  select: creatorSelect,
                },
              },
            },
          },
          skip: (input.page - 1) * input.limit,
          take: input.limit,
        });

        const hasNext = await PaginationCommon.hasNextPage(
          input.page,
          input.limit,
          'collection',
          whereConditionCollection,
        );
        return {
          data: dataCollection,
          paging: {
            hasNext,
            page: input.page,
            limit: input.limit,
          },
        };
      } else if (input.mode === SearchAllType.USER) {
        const whereConditionUser: Prisma.UserWhereInput = {};
        whereConditionUser.OR = [];
        whereConditionUser.OR.push(
          {
            username: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
          {
            signer: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
          {
            shortLink: {
              contains: input.text,
              mode: 'insensitive',
            },
          },
        );

        const dataUser = await this.prisma.user.findMany({
          select: creatorSelect,
          where: whereConditionUser,
          skip: (input.page - 1) * input.limit,
          take: input.limit,
        });
        const hasNext = await PaginationCommon.hasNextPage(
          input.page,
          input.limit,
          'user',
          whereConditionUser,
        );
        return {
          data: dataUser,
          paging: {
            hasNext,
            page: input.page,
            limit: input.limit,
          },
        };
      } else if (input.mode === SearchAllType.NFT) {
        const whereConditionNFT: Prisma.NFTWhereInput = {};
        whereConditionNFT.OR = [];
        whereConditionNFT.OR.push({
          nameSlug: {
            contains: OtherCommon.stringToSlugSearch(input.text),
            mode: 'insensitive',
          },
        });
        const dataNFT = await this.prisma.nFT.findMany({
          where: whereConditionNFT,
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          // {
          //   OR: [
          //     {
          //       nameSlug: {
          //         contains: OtherCommon.stringToSlugSearch(input.text),
          //         mode: 'insensitive',
          //       },
          //     },
          //   ],
          // },
          include: {
            collection: {
              select: CollectionSelect,
            },
          },
        });
        const hasNext = await PaginationCommon.hasNextPage(
          input.page,
          input.limit,
          'nFT',
          whereConditionNFT,
        );
        return {
          data: dataNFT,
          paging: {
            hasNext,
            page: input.page,
            limit: input.limit,
          },
        };
      }
    } else {
      return {
        data: [],
        paging: {
          hasNext: false,
          page: input.page,
          limit: input.limit,
        },
      };
    }
  }
  async uploadIpfs(files: Express.Multer.File[], metadata: any) {
    try {
      const filesToAdd = files.map((file) => ({
        path: file.originalname,
        content: file.buffer,
      }));
      const results = [];
      for await (const result of this.ipfs.addAll(filesToAdd, {
        wrapWithDirectory: true,
      })) {
        results.push(result);
      }

      // Assuming the last entry is the directory
      const directory = results[results.length - 1];
      if (!directory) {
        throw new Error('Failed to retrieve directory CID');
      }
      const directoryCid = directory.cid.toString();

      const fileUrls = files.map(
        (file) => `ipfs://ipfs/${directoryCid}/${file.originalname}`,
      );
      if (metadata) {
        const metadataObject = JSON.parse(metadata);
        const updatedMetadata = { ...metadataObject, fileUrls };

        const metadataResult = await this.ipfs.add(
          JSON.stringify(updatedMetadata),
        );
        return {
          fileHashes: fileUrls,
          metadataHash: metadataResult.path,
        };
      } else {
        return { fileHashes: fileUrls };
      }
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async uploadIpfsPinata(files: Express.Multer.File[], metadata: any) {
    try {
      const filesToAdd = files.map((file) => ({
        path: file.originalname,
        content: file.buffer,
      }));
      const results = [];

      for (const file of filesToAdd) {
        const formData = new FormData();
        const blob = new Blob([file.content]);
        const pinataMetadata = JSON.stringify({
          name: file.path,
        });
        formData.append('file', blob);
        formData.append('pinataMetadata', pinataMetadata);
        const result = await CommonHepler.postPinata(formData);
        results.push(result);
      }

      const directory = results[results.length - 1];
      if (!directory) {
        throw new Error('Failed to retrieve directory CID');
      }
      const directoryCid = directory.IpfsHash.toString();
      const fileUrls = files.map(
        (file) => `${PINATA_GATEWAYS}/ipfs/${directoryCid}`,
      );
      if (metadata) {
        const metadataObject = JSON.parse(metadata);
        const updatedMetadata = { ...metadataObject, fileUrls };
        const metaDataUpload = JSON.stringify({
          pinataContent: updatedMetadata,
          pinataMetadata: {
            name: `${directoryCid}.json`,
          },
        });
        const result = await CommonHepler.uploadMetadataToIPFS(metaDataUpload);
        return {
          fileHashes: fileUrls,
          metadataHash: `${PINATA_GATEWAYS}/ipfs/${result.IpfsHash}`,
        };
      } else {
        return { fileHashes: fileUrls };
      }
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async getFileFromIpfsPath(ipfsPath: string, @Res() res): Promise<void> {
    const { cid, filePath } = this.parseIpfsPath(ipfsPath);

    const fileExtension = path.extname(filePath).toLowerCase(); // Extract file extension

    // Set Content-Type based on file extension
    const contentType = this.getContentType(fileExtension);
    res.setHeader('Content-Type', contentType);

    const contentGenerator = this.ipfs.cat(`${cid}/${filePath}`);

    for await (const chunk of contentGenerator) {
      res.write(chunk);
    }

    res.end();
  }

  private getContentType(fileExtension: string): string {
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      case '.bmp':
        return 'image/bmp';
      case '.svg':
        return 'image/svg+xml';
      case '.webp':
        return 'image/webp';
      case '.pdf':
        return 'application/pdf';
      case '.mp3':
        return 'audio/mpeg';
      case '.mp4':
        return 'video/mp4';
      case '.avi':
        return 'video/x-msvideo';
      case '.wmv':
        return 'video/x-ms-wmv';
      case '.mov':
        return 'video/quicktime';
      case '.flv':
        return 'video/x-flv';
      case '.ogg':
        return 'audio/ogg';
      case '.wav':
        return 'audio/wav';
      case '.webm':
        return 'video/webm';
      case '.json':
        return 'application/json';
      case '.xml':
        return 'application/xml';
      // Add more cases for different file types as needed
      default:
        return 'application/json';
    }
  }
  async getFromIpfs(hash: string): Promise<{ data: any; type: string }> {
    try {
      const content = [];
      const { cid } = this.parseIpfsPath(hash);
      for await (const chunk of this.ipfs.cat(cid)) {
        content.push(chunk);
      }
      const buffer = Buffer.concat(content);

      // Try to parse buffer as JSON
      try {
        const json = JSON.parse(buffer.toString());
        return { data: json, type: 'json' };
      } catch (e) {
        // If it's not JSON, return it as a file
        return { data: buffer, type: 'file' };
      }
    } catch (err) {
      console.error('Error retrieving content from IPFS:', err);
      throw err;
    }
  }

  // async getFileFromIpfs(hash: string, res: Response) {
  //   try {
  //     const content = [];
  //     for await (const chunk of this.ipfs.cat(hash)) {
  //       content.push(chunk);
  //     }
  //     const buffer = Buffer.concat(content);
  //     const filetype = await fileType.fromBuffer(buffer);
  //     const { ext, mime } = filetype;
  //     const result = OtherCommon.convertBufferToFile(buffer);
  //     // Set response headers
  //     res.set({
  //       'Content-Type': `${mime}`,
  //       'Content-Disposition': `attachment; filename=${hash}.${ext}`,
  //     });

  //     // // Send the Blob as the response
  //     res.send(result);
  //   } catch (err) {
  //     console.error('Error retrieving content from IPFS:', err);
  //     throw err;
  //   }
  // }

  async retrieveFilesFromDirectory(
    directoryCid: string,
  ): Promise<{ filename: string; content: Buffer }[]> {
    const files = [];

    for await (const file of this.ipfs.ls(directoryCid)) {
      if (file.type === 'file') {
        // Stream file content
        const contentStream = [];
        for await (const chunk of this.ipfs.cat(file.cid)) {
          contentStream.push(chunk);
        }

        // Concatenate the chunks into a single Buffer
        const contentBuffer = Buffer.from(uint8ArrayConcat(contentStream));
        files.push({ filename: file.name, content: contentBuffer });
      }
    }

    return files;
  }

  private parseIpfsPath(ipfsPath: string): { cid: string; filePath: string } {
    if (ipfsPath.includes('ipfs://ipfs/')) {
      const pathParts = ipfsPath.replace('ipfs://ipfs/', '').split('/');
      const cid = pathParts[0];
      const filePath = pathParts.slice(1).join('/');

      return { cid, filePath };
    } else {
      const pathParts = ipfsPath.replace('ipfs://', '').split('/');
      const cid = pathParts[0];
      const filePath = pathParts.slice(1).join('/');

      return { cid, filePath };
    }
  }

  async uploadFile(files: Express.Multer.File[]) {
    try {
      return await Promise.all(
        files.map(async (file) => {
          const filename = uuidv4() + '-' + file.originalname;
          const responseS3 = await this.s3_upload(
            file.buffer,
            filename,
            file.mimetype,
          );
          return responseS3.Location;
        }),
      );
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async s3_upload(buffer: Buffer, name: string, mimetype: string) {
    try {
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: String(name),
        Body: buffer,
        ACL: 'public-read',
        ContentType: mimetype,
        ContentDisposition: 'inline',
        CreateBucketConfiguration: {
          LocationConstraint: this.AWS_REGION,
        },
      };
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
