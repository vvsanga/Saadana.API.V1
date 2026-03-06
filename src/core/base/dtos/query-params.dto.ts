import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PagingDto } from './pagination.dto';

export class QueryParamsDto extends PagingDto {
  @ApiPropertyOptional({
    example: 'level:asc,order:asc,title:desc',
  })
  sort?: string;

  @ApiPropertyOptional()
  searchField?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => value?.trim())
  searchText?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  searchExact?: boolean = false;

  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean = true;

  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  noPaging?: boolean = false;
}
