import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { ActionCore } from "../../infra/dtos/node.dto";
import { AcdSyllabus } from "../entities/syllabus.entity";

class EnableAction {
    @ApiPropertyOptional({ example: true, default: true })
    enableSheets?: boolean;

    @ApiPropertyOptional({ example: true, default: true })
    enableGames?: boolean;

    @ApiPropertyOptional({ example: true, default: true })
    enableTests?: boolean;

    @ApiPropertyOptional({ example: true, default: true })
    enableBoards?: boolean;

    @ApiPropertyOptional({ example: true, default: true })
    enableNotes?: boolean;
}

class AcdSyllabusCore extends IntersectionType(ActionCore, EnableAction) {
    @ApiPropertyOptional({ example: 'XXX' })
    code?: string;
    @ApiProperty({ example: 1 })
    level!: number;
    @ApiProperty({ example: 1 })
    gradeFrom!: number;
    @ApiProperty({ example: 10 })
    gradeTo!: number;
}

class AcdSyllabusCoreDto extends AcdSyllabusCore {
    constructor(entity?: AcdSyllabus) {
        super();
        if (!entity) return;

        this.level = entity.level;
        this.order = entity.order;
        this.label = entity.label;
        this.avatar = entity.avatar
        this.description = entity.description;
        this.code = entity.code;
        this.gradeFrom = entity.gradeFrom;
        this.gradeTo = entity.gradeTo;
        this.enableBoards = entity.enableBoards;
        this.enableGames = entity.enableGames;
        this.enableNotes = entity.enableNotes;
        this.enableSheets = entity.enableSheets;
        this.enableTests = entity.enableTests;
    }
}

export class AcdSyllabusRefDto extends IntersectionType(BaseUidDto, AcdSyllabusCoreDto) {
    constructor(entity: AcdSyllabus) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new AcdSyllabusCoreDto(entity));
    }
}

export class AcdSyllabusLesDto extends IntersectionType(BaseUidDto) {
    @ApiPropertyOptional({ example: 'XXX' })
    code?: string;
    @ApiProperty({ example: 1 })
    level!: number;
    @ApiProperty({ example: 1 })
    gradeFrom!: number;
    @ApiProperty({ example: 10 })
    gradeTo!: number;
    @ApiProperty()
    order!: number;
    @ApiProperty()
    label!: string;
    @ApiProperty()
    avatar?: string;

    constructor(entity: AcdSyllabus) {
        super();
        if (!entity) return;

        Object.assign(this, new BaseUidDto(entity));

        this.level = entity.level;
        this.order = entity.order;
        this.label = entity.label;
        this.avatar = entity.avatar
    }
}

export class AcdSyllabusDto extends IntersectionType(BaseCreateDto, AcdSyllabusRefDto) {
    @ApiProperty()
    parent: AcdSyllabusLesDto;

    @ApiProperty()
    children: AcdSyllabusLesDto[] | null;

    constructor(entity: AcdSyllabus) {
        super(entity);

        Object.assign(this, new BaseCreateDto(entity));
        Object.assign(this, new AcdSyllabusRefDto(entity));

        this.parent = new AcdSyllabusLesDto(entity.parent)

        this.children = entity.children?.length
            ? entity.children.map(c => new AcdSyllabusLesDto(c))
            : null;
    }
}

export class AcdSyllabusCreateDto extends PartialType(AcdSyllabusCore) {
    @ApiPropertyOptional({
        example: 'f507a3a81f9e',
        description: 'Parent UID',
    })
    @Length(12, 12)
    parentUid?: string;
}

export class AcdSyllabusUpdateDto extends IntersectionType(BaseUidDto, PartialType(AcdSyllabusCreateDto)) { }
