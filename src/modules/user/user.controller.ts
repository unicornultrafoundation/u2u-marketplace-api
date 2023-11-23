import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from '../auth/dto/login.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { User } from '@prisma/client';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { GetAllUser } from './dto/get-all-user.dto';
import {FilterNFTUserDetail} from './dto/get-nft-user.dto';
import {UserServiceExtend} from './user-graph.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userServiceExtend : UserServiceExtend
    ) {}

  @Post('profile')
  @UseGuards(AuthenticationGuard)
  async updateProfile(@Body() updateProfile: UpdateUserDto, @GetCurrentUser() user: User) {
    return await this.userService.updateProfile(updateProfile, user);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') signer: string) {
    return await this.userService.findOneByWallet(signer);
  }

  @Get('all')
  async getAllUser(@Query() filter: GetAllUser) {
    return await this.userService.findAll(filter);
  }

  @Get('/nft/:id')
  async getNFTWithUserID(@Param('id') id: string , @Query() filter : FilterNFTUserDetail){
    return await this.userServiceExtend.getNFTByUser(id , filter)
  }

  @Get('/collection/:id')
  async getCollectionWithUserID(@Param('id') id : string){
    return await this.userServiceExtend.getCollectionByUser(id);
  }

}
