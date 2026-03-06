import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { TestOption } from "../entities/test-option.entity";
import { TestQuestionRefDto } from "./test-question.dto";

class TestOptionCore {
    @ApiProperty({ example: 'x = 5' })
    @IsNotEmpty()
    expression!: string;

    @ApiProperty({ example: false })
    isCorrect!: boolean;

    @ApiProperty({ example: 1 })
    order?: number;
}

class TestOptionCoreDto extends TestOptionCore {
    constructor(entity?: TestOption) {
        super();
        if (!entity) return;

        this.expression = entity.expression;
        this.isCorrect = entity.isCorrect;
        this.order = entity.order;
    }
}

export class TestOptionRefDto extends IntersectionType(BaseUidDto, TestOptionCoreDto) {
    constructor(entity: TestOption) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new TestOptionCoreDto(entity));
    }
}

export class TestOptionDto extends IntersectionType(BaseUpdateDto, TestOptionRefDto) {
    @ApiProperty({ type: () => TestQuestionRefDto })
    question: TestQuestionRefDto | null;

    constructor(entity: TestOption) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new TestOptionRefDto(entity));

        this.question = entity.question
            ? new TestQuestionRefDto(entity.question)
            : null;
    }
}

export class TestOptionCreateDto extends PartialType(TestOptionCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    questionUid!: string;
}

export class TestOptionUpdateDto extends IntersectionType(BaseUidDto, PartialType(TestOptionCreateDto)) { }
