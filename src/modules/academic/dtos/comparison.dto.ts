import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdComparison } from "../entities/comparison.entity";
import { AcdComparisonItemRefDto } from "./comparison-item.dto";
import { AcdContentComparisonRefDto } from "./content-comparison.dto";

class AcdComparisonCore {
    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    title!: string;

    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    topics!: string;
}

class AcdComparisonCoreDto extends AcdComparisonCore {
    constructor(entity?: AcdComparison) {
        super();
        if (!entity) return;
        this.title = entity.title;
        this.topics = entity.topics;
    }
}

export class AcdComparisonRefDto extends IntersectionType(BaseUidDto, AcdComparisonCoreDto) {
    constructor(entity?: AcdComparison) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdComparisonCoreDto(entity));
    }
}

export class AcdComparisonDto extends IntersectionType(BaseUpdateDto, AcdComparisonRefDto) {

    @ApiProperty({ type: () => AcdComparisonItemRefDto })
    items: AcdComparisonItemRefDto[] | undefined;

    @ApiProperty({ type: () => AcdContentComparisonRefDto })
    contents: AcdContentComparisonRefDto[] | undefined;

    constructor(entity?: AcdComparison) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdComparisonRefDto(entity));

        this.items = entity?.items.map(x => new AcdComparisonItemRefDto(x));

        this.contents = entity?.contents?.length
            ? entity?.contents?.map(x => new AcdContentComparisonRefDto(x))
            : undefined;
    }
}

export class AcdComparisonCreateDto extends PartialType(AcdComparisonCore) { }

export class AcdComparisonUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdComparisonCreateDto)) { }
