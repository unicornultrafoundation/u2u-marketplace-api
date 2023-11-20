import { Controller, Get, Post, Body, Patch, Param, Delete, Query , UseGuards, Put} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto} from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { User } from '@prisma/client';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService : CollectionService){}

  @Post()
  @UseGuards(AuthenticationGuard)
  create(@Body() createCollectionDto : CreateCollectionDto ,  @GetCurrentUser() user: User ) {
    return this.collectionService.create(createCollectionDto , user);
  }

  @Get()
  findAll(){
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id : string){
    console.log(id)
    return this.collectionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id : string, @Body() updateCollectionDto : UpdateCollectionDto ){
    return this.collectionService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id : string){
    return this.collectionService.remove(id);
  }
  
  @Get("/user/:id")
  findByUserID(@Param('id') id : string){
    return this.collectionService.findWithUserID(id);
  }
}
