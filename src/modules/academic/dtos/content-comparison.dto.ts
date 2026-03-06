import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdContentComparison } from "../entities/content-comparison.entity";

class AcdContentComparisonCore {
    @ApiProperty()
    order!: number;
}

class AcdContentComparisonCoreDto extends AcdContentComparisonCore {
    constructor(entity?: AcdContentComparison) {
        super();
        if (!entity) return;
        this.order = entity.order;
    }
}

export class AcdContentComparisonRefDto extends IntersectionType(BaseUidDto, AcdContentComparisonCoreDto) {
    constructor(entity?: AcdContentComparison) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdContentComparisonCoreDto(entity));
    }
}

export class AcdContentComparisonDto extends IntersectionType(BaseUpdateDto, AcdContentComparisonRefDto) {
    constructor(entity?: AcdContentComparison) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdContentComparisonRefDto(entity));
    }
}

export class AcdContentComparisonCreateDto extends PartialType(AcdContentComparisonCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    contentUid!: string;

    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    comparisonUid!: string;
}

export class AcdContentComparisonUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdContentComparisonCreateDto)) { }
