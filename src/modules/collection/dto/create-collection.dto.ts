import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString , IsOptional, IsEnum } from 'class-validator';
import { TX_STATUS , CONTRACT_TYPE} from '@prisma/client';
import {TXSTATUS , CONTRACTTYPE} from '../entities/collection.entity'

@InputType()
export class CreateCollectionDto {
  // id: string;

  @IsString({message : 'Transaction Hash is invalid'})
  @IsNotEmpty({ message: 'Please Enter Transaction Hash' })
  txCreationHash: string;

  @IsString({message : 'Name Collection is invalid'})
  @IsNotEmpty({ message: 'Please Enter Name Collection' })
  name : string;

  @IsString({message : 'Symbol Collection is invalid'})
  @IsNotEmpty({ message: 'Please Enter Symbol Collection' })
  symbol : string;

  @IsOptional()
  description : string;

  @IsOptional()
  @IsEnum(TXSTATUS)
  status : TX_STATUS;

  @IsOptional()
  @IsEnum(CONTRACTTYPE)
  type : CONTRACT_TYPE;

  @IsOptional()
  categoryId : number;

  @IsOptional()
  @IsNotEmpty({message : 'Please Enter User ID'})
  creators : string;
}