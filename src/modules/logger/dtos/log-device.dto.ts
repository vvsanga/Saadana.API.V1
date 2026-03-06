import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { LogDevice } from "../entities/log-device.entity";
import { LogRequestRefDto } from "./log-request.dto";

class LogDeviceCore {
  @ApiProperty({ example: '192.168.1.10' })
  ip!: string;

  @ApiProperty({ example: 'Asia/Kolkata' })
  timezone!: string;

  @ApiPropertyOptional({ example: 'IN, Karnataka, Bengaluru' })
  geo?: string;

  @ApiPropertyOptional({ example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' })
  agent?: string;
}

class LogDeviceCoreDto extends LogDeviceCore {
  constructor(entity?: LogDevice) {
    super();
    if (!entity) return;

    this.ip = entity.ip;
    this.timezone = entity.timezone;
    this.geo = entity.geo;
    this.agent = entity.agent;
  }
}

export class LogDeviceRefDto extends IntersectionType(BaseUidDto, LogDeviceCoreDto) {
  constructor(entity: LogDevice) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new LogDeviceCoreDto(entity));
  }
}

export class LogDeviceDto extends IntersectionType(BaseCreateDto, LogDeviceRefDto) {
  @ApiProperty({ type: () => LogRequestRefDto, isArray: true, nullable: true })
  requests: LogRequestRefDto[] | null;

  constructor(entity: LogDevice) {
    super(entity);
    Object.assign(this, new BaseCreateDto(entity));
    Object.assign(this, new LogDeviceRefDto(entity));

    this.requests = entity.requests?.length
      ? entity.requests.map(r => new LogRequestRefDto(r))
      : null;
  }
}

export class LogDeviceCreateDto extends PartialType(LogDeviceCore) { }

export class LogDeviceUpdateDto extends IntersectionType(BaseUidDto, PartialType(LogDeviceCreateDto)) { }
