import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CollectionService , PrismaService],
  controllers: [CollectionController]
})
export class CollectionModule {}
