import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from '../auth/dto/login.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { User } from '@prisma/client';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { AuthenticationGuardForVerify } from '../auth/guards/authForVerify.guard';

import { GetAllUser } from './dto/get-all-user.dto';
import { FilterNFTUserDetail } from './dto/get-nft-user.dto';
import { UserServiceExtend } from './user-graph.service';
import { AuthenticationCustomizeGuard } from '../auth/guards/authCustomize.guard';
import { FindAllProjectDto } from '../launchpad/dto/find-all-project.dto';
import { SendVerifyEmailDto, VerifyEmailDto } from './dto/verify-email.dto';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userServiceExtend: UserServiceExtend,
  ) {}

  @Post('profile')
  @UseGuards(AuthenticationGuard)
  async updateProfile(
    @Body() updateProfile: UpdateUserDto,
    @GetCurrentUser() user: User,
  ) {
    return await this.userService.updateProfile(updateProfile, user);
  }

  // @Get('profile/:id')
  // async getProfile(@Param('id') signer: string) {
  //   return await this.userService.findOneByWallet(signer);
  // }

  @Get('all')
  async getAllUser(@Query() filter: GetAllUser) {
    return await this.userService.findAll(filter);
  }

  @Get('/nft/:id')
  async getNFTWithUserID(
    @Param('id') id: string,
    @Query() filter: FilterNFTUserDetail,
  ) {
    return await this.userServiceExtend.getNFTByUser(id, filter);
  }

  @Get('/collection/:id')
  async getCollectionWithUserID(@Param('id') id: string) {
    return await this.userServiceExtend.getCollectionByUser(id);
  }

  @Get('profile/:id')
  @UseGuards(AuthenticationCustomizeGuard)
  async findWithShortLink(
    @Param('id') signer: string,
    @GetCurrentUser() user: User,
  ) {
    return await this.userService.getProfileWithShortLinkOrIdUser(signer, user);
  }

  @Get('/projects')
  @UseGuards(AuthenticationGuard)
  async getProjectByUser(
    @GetCurrentUser() user: User,
    @Query() query: FindAllProjectDto,
  ) {
    return await this.userService.getProjectByUser(query, user);
  }

  @Post('/send-verify-email')
  @UseGuards(AuthenticationGuardForVerify)
  async sendVerifyEmail(
    @GetCurrentUser() user: User,
    @Body() verifyEmailDto: SendVerifyEmailDto,
  ) {
    return await this.userService.sendverifyEmail(verifyEmailDto, user);
  }

  @Post('/verify-email')
  @UseGuards(AuthenticationGuardForVerify)
  async verifyEmail(
    @GetCurrentUser() user: User,
    @Body() verifyEmailDto: VerifyEmailDto,
  ) {
    return await this.userService.checkVerifyEmail(verifyEmailDto, user);
  }
}
