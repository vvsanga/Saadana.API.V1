import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { LogError } from "../entities/log-error.entity";
import { LogRequestRefDto } from "./log-request.dto";

class LogErrorCore {
    @ApiProperty({ example: 500 })
    status!: number;

    @ApiPropertyOptional({ example: 'TypeError' })
    name?: string;

    @ApiPropertyOptional({ example: 'Cannot read property x of undefined' })
    message?: string;

    @ApiPropertyOptional({ example: 'AuthService.login' })
    source?: string;
}

class LogErrorCoreDto extends LogErrorCore {
    constructor(entity?: LogError) {
        super();
        if (!entity) return;

        this.status = entity.status;
        this.name = entity.name;
        this.message = entity.message;
        this.source = entity.source;
    }
}

export class LogErrorRefDto extends IntersectionType(BaseUidDto, LogErrorCoreDto) {
    constructor(entity: LogError) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new LogErrorCoreDto(entity));
    }
}

export class LogErrorDto extends IntersectionType(BaseCreateDto, LogErrorRefDto) {
    @ApiProperty({ type: () => LogRequestRefDto })
    request: LogRequestRefDto | null;

    constructor(entity: LogError) {
        super(entity);
        Object.assign(this, new BaseCreateDto(entity));
        Object.assign(this, new LogErrorRefDto(entity));

        this.request = entity.request
            ? new LogRequestRefDto(entity.request)
            : null;
    }
}

export class LogErrorCreateDto extends PartialType(LogErrorCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    requestUid!: string;
}

export class LogErrorUpdateDto extends IntersectionType(BaseUidDto, PartialType(LogErrorCreateDto)) { }
