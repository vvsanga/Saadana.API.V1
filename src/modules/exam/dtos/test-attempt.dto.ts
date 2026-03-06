import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { UserRefDto } from "../../../modules/user/dtos/user.dto";
import { TestAttempt } from "../entities/test-attempt.entity";
import { TestResultRefDto } from "./test-result.dto";
import { TestRefDto } from "./test.dto";

class TestAttemptCore {
    @ApiProperty({ example: '2025-08-21T10:00:00.000Z' })
    startAt!: Date;

    @ApiPropertyOptional({ example: '2025-08-21T10:45:00.000Z' })
    submitAt?: Date;

    @ApiProperty({ example: false })
    isAutoSubmit!: boolean;

    @ApiProperty({ example: 85 })
    score!: number;

    @ApiProperty({ example: 1 })
    attemptCount!: number;

    @ApiProperty({ example: 0 })
    tabSwitchCount!: number;
}

class TestAttemptCoreDto extends TestAttemptCore {
    constructor(entity?: TestAttempt) {
        super();
        if (!entity) return;

        this.startAt = entity.startAt;
        this.submitAt = entity.submitAt;
        this.isAutoSubmit = entity.isAutoSubmit;
        this.score = entity.score;
        this.attemptCount = entity.attemptCount;
        this.tabSwitchCount = entity.tabSwitchCount;
    }
}

export class TestAttemptRefDto extends IntersectionType(BaseUidDto, TestAttemptCoreDto) {
    constructor(entity: TestAttempt) {
        super();
        Object.assign(this, new BaseUidDto(entity));
        Object.assign(this, new TestAttemptCoreDto(entity));
    }
}

export class TestAttemptDto extends IntersectionType(BaseUpdateDto, TestAttemptRefDto) {
    @ApiProperty({ type: () => UserRefDto })
    user: UserRefDto | null;

    @ApiProperty({ type: () => TestRefDto })
    test: TestRefDto | null;

    @ApiProperty({ type: () => TestResultRefDto, isArray: true, nullable: true })
    results: TestResultRefDto[] | null;

    constructor(entity: TestAttempt) {
        super(entity);
        Object.assign(this, new BaseUpdateDto(entity));
        Object.assign(this, new TestAttemptRefDto(entity));

        this.user = entity.user
            ? new UserRefDto(entity.user)
            : null;
        this.test = entity.test
            ? new TestRefDto(entity.test)
            : null;
        this.results = entity.results?.length
            ? entity.results.map(r => new TestResultRefDto(r))
            : null;
    }
}

export class TestAttemptCreateDto extends PartialType(TestAttemptCore) {
    @ApiProperty({ example: 'f507a3a81f9e' })
    @Length(12, 12)
    userUid!: string;

    @ApiProperty({ example: 'a91bc82d0e4f' })
    @Length(12, 12)
    testUid!: string;
}

export class TestAttemptUpdateDto extends IntersectionType(BaseUidDto, PartialType(TestAttemptCreateDto)) { }
