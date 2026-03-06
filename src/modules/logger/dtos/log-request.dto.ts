import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { UserRefDto } from "../../../modules/user/dtos/user.dto";
import { LogRequest } from "../entities/log-request.entity";
import { LogDeviceRefDto } from "./log-device.dto";
import { LogErrorRefDto } from "./log-error.dto";
import { LogResponseRefDto } from "./log-response.dto";

class LogRequestCore {
  @ApiProperty({ example: 'USER_LOGIN' })
  action!: string;

  @ApiPropertyOptional({ example: { method: 'POST', path: '/auth/login' } })
  payload?: any;
}

class LogRequestCoreDto extends LogRequestCore {
  constructor(entity?: LogRequest) {
    super();
    if (!entity) return;

    this.action = entity.action;
    this.payload = entity.payload;
  }
}

export class LogRequestRefDto extends IntersectionType(BaseUidDto, LogRequestCoreDto) {
  constructor(entity: LogRequest) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new LogRequestCoreDto(entity));
  }
}

export class LogRequestDto extends IntersectionType(BaseCreateDto, LogRequestRefDto) {
  @ApiProperty({ type: () => UserRefDto, nullable: true })
  user: UserRefDto | null;

  @ApiProperty({ type: () => LogDeviceRefDto })
  device: LogDeviceRefDto | null;

  @ApiProperty({ type: () => LogResponseRefDto, isArray: true, nullable: true })
  responses: LogResponseRefDto[] | null;

  @ApiProperty({ type: () => LogErrorRefDto, isArray: true, nullable: true })
  errors: LogErrorRefDto[] | null;

  constructor(entity: LogRequest) {
    super(entity);
    Object.assign(this, new BaseCreateDto(entity));
    Object.assign(this, new LogRequestRefDto(entity));

    this.user = entity.user
      ? new UserRefDto(entity.user)
      : null;
    this.device = entity.device
      ? new LogDeviceRefDto(entity.device)
      : null;
    this.responses = entity.responses?.length
      ? entity.responses.map(r => new LogResponseRefDto(r))
      : null;
    this.errors = entity.errors?.length
      ? entity.errors.map(e => new LogErrorRefDto(e))
      : null;
  }
}

export class LogRequestCreateDto extends PartialType(LogRequestCore) {
  @ApiPropertyOptional({ example: 'f507a3a81f9e' })
  @Length(12, 12)
  userUid?: string;

  @ApiProperty({ example: 'a91bc82d0e4f' })
  @Length(12, 12)
  deviceUid!: string;
}

export class LogRequestUpdateDto extends IntersectionType(BaseUidDto, PartialType(LogRequestCreateDto)) { }
