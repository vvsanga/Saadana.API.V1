import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, Length } from "class-validator";
import { BaseCreateDto } from "../../../core/base/dtos/base-create.dto";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { AppNode } from "../entities/app-node.entity";

export class ActionCore {

    @ApiProperty({ example: 1 })
    order!: number;

    @ApiProperty({ example: 'Science' })
    @IsNotEmpty()
    label!: string;

    @ApiPropertyOptional({ example: 'science.svg' })
    avatar?: string;

    @ApiPropertyOptional({ example: 'Introduction to science' })
    description?: string;

    @ApiPropertyOptional({ example: 'Detailed subject overview' })
    descriptionLong?: string;

    @ApiPropertyOptional({ type: [String], example: ['science1.png'] })
    @IsArray()
    meta?: string[];
}

class NodeCore extends ActionCore {
    @ApiProperty()
    master?: string;
    @ApiPropertyOptional({ example: false })
    protected?: boolean;
}

class NodeCoreDto extends NodeCore {
    constructor(entity?: AppNode) {
        super();
        if (!entity) return;

        this.label = entity.label;
        this.avatar = entity.avatar
        this.master = entity.master;
        this.description = entity.description;
        this.descriptionLong = entity.descriptionLong;
        this.meta = entity.meta;
        this.order = entity.order;
        this.protected = entity.protected;
    }
}

export class NodeRefDto extends IntersectionType(BaseUidDto, NodeCoreDto) {
    constructor(entity: AppNode) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new NodeCoreDto(entity));
    }
}

export class NodeDto extends IntersectionType(BaseCreateDto, NodeRefDto) {

    constructor(entity: AppNode) {
        super(entity);
        Object.assign(this, new BaseCreateDto(entity));
        Object.assign(this, new NodeRefDto(entity));
    }
}

export class NodeCreateDto extends PartialType(NodeCore) {
    @ApiProperty({ example: 'f507a3a81f9e', description: 'Unique identifier' })
    @Length(12, 12)
    masterUid!: string;

    @ApiProperty({ example: 'f507a3a81f9e', description: 'Unique identifier' })
    @Length(12, 12)
    parentUid!: string;
}

export class NodeUpdateDto extends IntersectionType(BaseUidDto, PartialType(NodeCreateDto)) { }
