import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { LogResponse } from "../entities/log-response.entity";
import { LogRequestRefDto } from "./log-request.dto";

class LogResponseCore {
  @ApiProperty({ example: 200 })
  status!: number;

  @ApiPropertyOptional({ example: 'OK' })
  message?: string;

  @ApiPropertyOptional({ example: 123 })
  durationMs?: number;
}

class LogResponseCoreDto extends LogResponseCore {
  constructor(entity?: LogResponse) {
    super();
    if (!entity) return;

    this.status = entity.status;
    this.message = entity.message;
    this.durationMs = entity.durationMs;
  }
}

export class LogResponseRefDto extends IntersectionType(BaseUidDto, LogResponseCoreDto) {
  constructor(entity: LogResponse) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new LogResponseCoreDto(entity));
  }
}

export class LogResponseDto extends IntersectionType(BaseCreateDto, LogResponseRefDto) {
  @ApiProperty({ type: () => LogRequestRefDto })
  request: LogRequestRefDto | null;

  constructor(entity: LogResponse) {
    super(entity);
    Object.assign(this, new BaseCreateDto(entity));
    Object.assign(this, new LogResponseRefDto(entity));

    this.request = entity.request
      ? new LogRequestRefDto(entity.request)
      : null;
  }
}

export class LogResponseCreateDto extends PartialType(LogResponseCore) {
  @ApiProperty({ example: 'f507a3a81f9e' })
  @Length(12, 12)
  requestUid!: string;
}

export class LogResponseUpdateDto extends IntersectionType(BaseUidDto, PartialType(LogResponseCreateDto)) { }
