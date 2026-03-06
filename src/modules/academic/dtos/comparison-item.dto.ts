import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length, MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdComparisonItem } from "../entities/comparison-item.entity";

class AcdComparisonItemCore {
    @ApiProperty()
    orderRow!: number;

    @ApiProperty()
    orderCol!: number;

    @ApiProperty({ maxLength: 120 })
    @MaxLength(500)
    content!: string;
}

class AcdComparisonItemCoreDto extends AcdComparisonItemCore {
    constructor(entity?: AcdComparisonItem) {
        super();
        if (!entity) return;
        this.content = entity.content;
        this.orderCol = entity.orderCol;
        this.orderRow = entity.orderRow;
    }
}

export class AcdComparisonItemRefDto extends IntersectionType(BaseUidDto, AcdComparisonItemCoreDto) {
    constructor(entity?: AcdComparisonItem) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdComparisonItemCoreDto(entity));
    }
}

export class AcdComparisonItemDto extends IntersectionType(BaseUpdateDto, AcdComparisonItemRefDto) {
    constructor(entity?: AcdComparisonItem) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdComparisonItemRefDto(entity));
    }
}

export class AcdComparisonItemCreateDto extends PartialType(AcdComparisonItemCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    comparisonUid!: string;
}

export class AcdComparisonItemUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdComparisonItemCreateDto)) { }
