import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { UpdateCommonDto } from './dto/update-common.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';
import { Response } from 'express';
import { SearchAllDto } from './dto/search-all.dto';
import { multerOptions } from './interceptor/interceptor';
import * as AWS from 'aws-sdk';
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('upload-ipfs')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadIpfs(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createFileDto: CreateFileDto,
  ) {
    if (process.env.NODE_ENV === 'production') {
      return await this.commonService.uploadIpfsPinata(
        files,
        createFileDto.metadata,
      );
    }
    return await this.commonService.uploadIpfs(files, createFileDto.metadata);
  }

  @Get('/ipfs-serve')
  async serveFile(
    @Query('ipfsPath') ipfsPath: string,
    @Res() res: Response,
  ): Promise<any> {
    return await this.commonService.getFileFromIpfsPath(ipfsPath, res);
  }

  @Get('get-ipfs')
  async getIpfs(@Query('hash') hash: string) {
    return await this.commonService.getFromIpfs(hash);
  }

  // async getFileFromIpfs(@Query('hash') hash: string, @Res() res: Response) {
  //   return await this.commonService.getFileFromIpfs(hash, res);
  // }

  @Post('search-all')
  async searchAll(@Body() input: SearchAllDto) {
    return this.commonService.searchAll(input);
  }

  @Post('upload-s3')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.commonService.uploadFile(files);
  }
}
