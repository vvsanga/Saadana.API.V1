import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCreateEntity } from '../entities/base-create.entity';

export class BaseCreateDto {
  @ApiPropertyOptional({ description: 'Internal primary identifier', example: 1 })
  id!: number;

  @ApiPropertyOptional({ description: 'Indicates if the record is active', example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'User ID who created the record', example: 101 })
  createdBy?: number;

  @ApiPropertyOptional({ description: 'Record creation timestamp', example: '2025-08-14T12:34:56.789Z' })
  createdAt?: Date;

  constructor(entity?: Partial<BaseCreateEntity>) {
    if (!entity) return;

    this.isActive = entity.isActive;
    this.createdBy = entity.createdBy;
    this.createdAt = entity.createdAt;
  }
}

