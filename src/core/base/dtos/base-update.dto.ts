import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseUpdateEntity } from '../entities/base-update.entity';
import { BaseCreateDto } from './base-create.dto';

export class BaseUpdateDto extends BaseCreateDto {
  @ApiPropertyOptional({ description: 'ID of the user who last updated the record', example: 101 })
  updatedBy?: number;

  @ApiPropertyOptional({ description: 'Record last updated timestamp', example: '2025-08-15T14:30:00.000Z' })
  updatedAt?: Date;

  constructor(entity?: Partial<BaseUpdateEntity>) {
    super(entity);
    if (!entity) return;

    this.updatedBy = entity.updatedBy;
    this.updatedAt = entity.updatedAt;
  }
}
