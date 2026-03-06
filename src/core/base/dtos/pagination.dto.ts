import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PagingDto {
    @ApiPropertyOptional({ example: 1, default: 1 })
    @Type(() => Number)
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, default: 10 })
    @Type(() => Number)
    @Min(1)
    @Max(100)
    pageSize?: number = 10;
}
