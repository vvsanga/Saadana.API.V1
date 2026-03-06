import { IntersectionType, PartialType } from "@nestjs/swagger";
import { IsInt, IsIP, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { IsIpRangeValid } from "../../../core/validators/ip-range.validator";

export class ClientCreateDto {
  @IsString()
  @Length(1, 128)
  name!: string;

  @IsIP(undefined, { message: 'ipFrom must be a valid IPv4 or IPv6' })
  ipFrom!: string;

  @IsOptional()
  @IsIP(undefined, { message: 'ipTo must be a valid IPv4 or IPv6' })
  @IsIpRangeValid({ message: 'ipTo must be >= ipFrom and same family as ipFrom' })
  ipTo?: string;

  @IsOptional()
  @IsString({ message: 'origins must be a string (comma-separated list)' })
  @Length(0, 1024, { message: 'origins cannot exceed 1024 characters' })
  origins?: string;

  @IsInt()
  @Min(1, { message: 'rateLimit must be at least 1' })
  @Max(5, { message: 'rateLimit must not exceed 5' })
  rateLimit: number = 2;
}

export class ClientUpdateDto extends IntersectionType(BaseUidDto, PartialType(ClientCreateDto)) { }

export class ClientDto extends IntersectionType(BaseUpdateDto, ClientCreateDto) { }
