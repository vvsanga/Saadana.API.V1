import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length, MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdContent } from "../entities/content.entity";
import { AcdContentComparisonRefDto } from "./content-comparison.dto";
import { AcdContentDiagramRefDto } from "./content-diagram.dto";

class AcdContentCore {

    @ApiPropertyOptional({ required: false })
    order?: number;

    @ApiProperty()
    type!: string;

    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    title!: string;

    @ApiProperty({ maxLength: 500 })
    @MaxLength(500)
    content!: string;
}

class AcdContentCoreDto extends AcdContentCore {
    constructor(entity?: AcdContent) {
        super();
        if (!entity) return;
        this.order = entity.order;
        this.type = entity.type;
        this.title = entity.title;
        this.content = entity.content;
    }
}

export class AcdContentRefDto extends IntersectionType(BaseUidDto, AcdContentCoreDto) {
    constructor(entity?: AcdContent) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdContentCoreDto(entity));
    }
}

export class AcdContentDto extends IntersectionType(BaseUpdateDto, AcdContentRefDto) {

    @ApiPropertyOptional({ type: () => AcdContentDiagramRefDto })
    diagrams?: AcdContentDiagramRefDto[];

    @ApiPropertyOptional({ type: () => AcdContentComparisonRefDto })
    comparisons?: AcdContentComparisonRefDto[];

    constructor(entity?: AcdContent) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdContentRefDto(entity));

        this.diagrams = entity?.diagrams?.length
            ? entity?.diagrams?.map(x => new AcdContentDiagramRefDto(x))
            : undefined;

        this.comparisons = entity?.comparisons?.length
            ? entity?.comparisons?.map(x => new AcdContentComparisonRefDto(x))
            : undefined;
    }
}

export class AcdContentCreateDto extends PartialType(AcdContentCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    topicUid!: string;
}

export class AcdContentUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdContentCreateDto)) { }