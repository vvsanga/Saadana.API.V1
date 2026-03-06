import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { EDifficultyLevel, EQuestionType } from "../constants/exam.enum";
import { TestQuestion } from "../entities/test-question.entity";
import { TestOptionRefDto } from "./test-option.dto";
import { TestResultRefDto } from "./test-result.dto";
import { TestRefDto } from "./test.dto";

class TestQuestionCore {
    @ApiPropertyOptional({ example: EDifficultyLevel.MEDIUM })
    @Length(1)
    difficultyLevel?: string;

    @ApiPropertyOptional({ example: 'Algebra' })
    topic!: string;

    @ApiProperty({ example: 'Solve: 2x + 5 = 15' })
    @IsNotEmpty()
    expression!: string;

    @ApiProperty({ example: EQuestionType.One })
    type!: number;

    @ApiPropertyOptional({ example: 1 })
    order!: number;

    @ApiProperty({ example: 1 })
    points!: number;
}

class TestQuestionCoreDto extends TestQuestionCore {
    constructor(entity?: TestQuestion) {
        super();
        if (!entity) return;

        this.difficultyLevel = entity.difficultyLevel;
        this.topic = entity.topic;
        this.expression = entity.expression;
        this.type = entity.type;
        this.order = entity.order;
        this.points = entity.points;
    }
}

export class TestQuestionRefDto extends IntersectionType(BaseUidDto, TestQuestionCoreDto) {
    constructor(entity: TestQuestion) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new TestQuestionCoreDto(entity));
    }
}

export class TestQuestionDto extends IntersectionType(BaseUpdateDto, TestQuestionRefDto) {
    @ApiProperty({ type: () => TestRefDto })
    test: TestRefDto | null;

    @ApiProperty({ type: () => TestOptionRefDto, isArray: true, nullable: true })
    options: TestOptionRefDto[] | null;

    @ApiProperty({ type: () => TestResultRefDto, isArray: true, nullable: true })
    results: TestResultRefDto[] | null;

    constructor(entity: TestQuestion) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new TestQuestionRefDto(entity));

        this.test = entity.test
            ? new TestRefDto(entity.test)
            : null;
        this.options = entity.options?.length
            ? entity.options.map(o => new TestOptionRefDto(o))
            : null;
        this.results = entity.results?.length
            ? entity.results.map(r => new TestResultRefDto(r))
            : null;
    }
}

export class TestQuestionCreateDto extends PartialType(TestQuestionCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    testUid!: string;
}

export class TestQuestionUpdateDto extends IntersectionType(BaseUidDto, PartialType(TestQuestionCreateDto)) { }
