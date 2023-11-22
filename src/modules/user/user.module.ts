import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserServiceExtend } from './user-graph.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService , UserServiceExtend]
})
export class UserModule {}
