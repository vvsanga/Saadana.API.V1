import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { AcdDiagram } from "../entities/diagram.entity";
import { AcdContentDiagramRefDto } from "./content-diagram.dto";

class AcdDiagramCore {
    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    media!: string;

    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    title!: string;

    @ApiProperty({ maxLength: 120 })
    @MaxLength(120)
    url!: string;
}

class AcdDiagramCoreDto extends AcdDiagramCore {
    constructor(entity?: AcdDiagram) {
        super();
        if (!entity) return;
        this.media = entity.media;
        this.title = entity.title;
        this.url = entity.url;
    }
}

export class AcdDiagramRefDto extends IntersectionType(BaseUidDto, AcdDiagramCoreDto) {
    constructor(entity?: AcdDiagram) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdDiagramCoreDto(entity));
    }
}

export class AcdDiagramDto extends IntersectionType(BaseUpdateDto, AcdDiagramRefDto) {

    @ApiProperty({ type: () => AcdContentDiagramRefDto })
    contents: AcdContentDiagramRefDto[] | undefined;

    constructor(entity?: AcdDiagram) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new AcdDiagramRefDto(entity));

        this.contents = entity?.contents?.length
            ? entity?.contents?.map(x => new AcdContentDiagramRefDto(x))
            : undefined;
    }
}

export class AcdDiagramCreateDto extends PartialType(AcdDiagramCore) { }

export class AcdDiagramUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdDiagramCreateDto)) { }
