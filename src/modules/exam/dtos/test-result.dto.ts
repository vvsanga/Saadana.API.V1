import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { TestResult } from "../entities/test-result.entity";
import { TestAttemptRefDto } from "./test-attempt.dto";
import { TestQuestionRefDto } from "./test-question.dto";

class TestResultCore {
    @ApiPropertyOptional({ example: [1, 3] })
    selectedOptions?: number[];

    @ApiProperty({ example: true })
    isCorrect!: boolean;
}

class TestResultCoreDto extends TestResultCore {
    constructor(entity?: TestResult) {
        super();
        if (!entity) return;

        this.selectedOptions = entity.selectedOptions;
        this.isCorrect = entity.isCorrect;
    }
}

export class TestResultRefDto extends IntersectionType(BaseUidDto, TestResultCoreDto) {
    constructor(entity: TestResult) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new TestResultCoreDto(entity));
    }
}

export class TestResultDto extends IntersectionType(BaseUpdateDto, TestResultRefDto) {
    @ApiProperty({ type: () => TestAttemptRefDto })
    attempt: TestAttemptRefDto | null;

    @ApiProperty({ type: () => TestQuestionRefDto })
    question: TestQuestionRefDto | null;

    constructor(entity: TestResult) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new TestResultRefDto(entity));

        this.attempt = entity.attempt
            ? new TestAttemptRefDto(entity.attempt)
            : null;
        this.question = entity.question
            ? new TestQuestionRefDto(entity.question)
            : null;
    }
}

export class TestResultCreateDto extends PartialType(TestResultCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    attemptUid!: string;

    @ApiProperty({ example: 'a91bc82d0e4f' })
    @Length(12, 12)
    questionUid!: string;
}

export class TestResultUpdateDto extends IntersectionType(BaseUidDto, PartialType(TestResultCreateDto)) { }
