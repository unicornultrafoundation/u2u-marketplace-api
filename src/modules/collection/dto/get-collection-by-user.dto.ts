import { IsOptional, IsEnum } from 'class-validator';
import { OffsetPaginationDto } from 'src/commons/definitions/OffsetPagination.input';
import { TypeBase } from '../../../constants/enums/TypeGetBase.enum';

export class GetCollectionByUserDto extends OffsetPaginationDto {
  @IsOptional()
  @IsEnum(TypeBase)
  hasBase: TypeBase;
}
