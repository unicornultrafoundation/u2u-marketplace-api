import { IsString, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { OffsetPaginationDto } from 'src/commons/definitions/OffsetPagination.input';

export class GetAllCollectionDto extends OffsetPaginationDto {
  // id: string;
  @Type(() => Number)
  @IsOptional()
  min: string;

  @Type(() => Number)
  @IsOptional()
  max: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  creatorAddresses: string;
}
