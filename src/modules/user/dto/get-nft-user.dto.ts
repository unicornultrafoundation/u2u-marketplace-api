import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {NFTTab} from '../../../constants/enums/NFTTab.enum';
import { IsNotEmpty, IsString , IsOptional, IsEnum } from 'class-validator';

export class FilterNFTUserDetail  {
    @IsOptional()
    @IsEnum(NFTTab)
    tab: NFTTab;
}
