import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdContentDiagram } from "../entities/content-diagram.entity";

class AcdContentDiagramCore {
    @ApiProperty()
    order!: number;
}

class AcdContentDiagramCoreDto extends AcdContentDiagramCore {
    constructor(entity?: AcdContentDiagram) {
        super();
        if (!entity) return;
        this.order = entity.order;
    }
}

export class AcdContentDiagramRefDto extends IntersectionType(BaseUidDto, AcdContentDiagramCoreDto) {
    constructor(entity?: AcdContentDiagram) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdContentDiagramCoreDto(entity));
    }
}

export class AcdContentDiagramDto extends IntersectionType(BaseUpdateDto, AcdContentDiagramRefDto) {
    constructor(entity?: AcdContentDiagram) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdContentDiagramRefDto(entity));
    }
}

export class AcdContentDiagramCreateDto extends PartialType(AcdContentDiagramCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    contentUid!: string;

    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    diagramUid!: string;
}

export class AcdContentDiagramUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdContentDiagramCreateDto)) { }
