import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {NFTType} from '../../../constants/enums/NFTType.enum';
import { IsNotEmpty, IsString , IsOptional, IsEnum } from 'class-validator';

export class FilterNFTUserDetail  {
    @IsOptional()
    @IsEnum(NFTType)
    type: NFTType;
}
