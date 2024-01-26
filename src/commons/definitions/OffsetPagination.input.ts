import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class OffsetPaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  // Add any other common pagination-related properties or methods here.
}
