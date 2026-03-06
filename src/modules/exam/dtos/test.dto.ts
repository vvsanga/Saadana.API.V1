import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { UserProfileRefDto } from "../../../modules/user/dtos/user-profile.dto";
import { EDifficultyLevel, EScoreMode } from "../constants/exam.enum";
import { Test } from "../entities/test.entity";
import { TestAttemptRefDto } from "./test-attempt.dto";
import { TestQuestionRefDto } from "./test-question.dto";

class TestCore {
  @ApiProperty({ example: 'Algebra Practice Test' })
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @ApiPropertyOptional({ example: 'Basic algebra assessment' })
  description?: string;

  @ApiPropertyOptional({ example: EDifficultyLevel.EASY })
  @Length(1)
  difficultyLevel?: string;

  @ApiProperty({ example: EScoreMode.SIMPLE })
  @Length(1)
  scoreMode!: string;

  @ApiProperty({ example: 10 })
  totalQuestions!: number;

  @ApiProperty({ example: 1 })
  pointsPerQuestion!: number;

  @ApiPropertyOptional({ example: 7 })
  passingPoints?: number;

  @ApiProperty({ example: 30 })
  durationMins!: number;

  @ApiProperty({ example: false })
  isPublished!: boolean;

  @ApiPropertyOptional({ example: '2025-08-20T10:00:00.000Z' })
  publishAt?: Date;

  @ApiPropertyOptional({ example: '2025-08-21T10:00:00.000Z' })
  startAt?: Date;

  @ApiPropertyOptional({ example: '2025-08-21T11:00:00.000Z' })
  endAt?: Date;

  @ApiPropertyOptional({ example: '2025-08-21T12:00:00.000Z' })
  resultAt?: Date;

  @ApiPropertyOptional({ example: 'a91bc82d0e4f' })
  @Length(12, 12)
  accessToken!: string;

  @ApiProperty({ example: 1 })
  maxAttempts!: number;

  @ApiProperty({ example: false })
  shuffleQuestions!: boolean;

  @ApiProperty({ example: false })
  shuffleOptions!: boolean;

  @ApiProperty({ example: false })
  showResult!: boolean;

  @ApiProperty({ example: false })
  showAnswer!: boolean;

  @ApiProperty({ example: false })
  allowPause!: boolean;

  @ApiProperty({ example: 0 })
  allowTabSwitch!: number;
}

class TestCoreDto extends TestCore {
  constructor(entity?: Test) {
    super();
    if (!entity) return;

    this.title = entity.title;
    this.description = entity.description;
    this.difficultyLevel = entity.difficultyLevel;
    this.scoreMode = entity.scoreMode;
    this.totalQuestions = entity.totalQuestions;
    this.pointsPerQuestion = entity.pointsPerQuestion;
    this.passingPoints = entity.passingPoints;
    this.durationMins = entity.durationMins;
    this.isPublished = entity.isPublished;
    this.publishAt = entity.publishAt;
    this.startAt = entity.startAt;
    this.endAt = entity.endAt;
    this.resultAt = entity.resultAt;
    this.accessToken = entity.accessToken;
    this.maxAttempts = entity.maxAttempts;
    this.shuffleQuestions = entity.shuffleQuestions;
    this.shuffleOptions = entity.shuffleOptions;
    this.showResult = entity.showResult;
    this.showAnswer = entity.showAnswer;
    this.allowPause = entity.allowPause;
    this.allowTabSwitch = entity.allowTabSwitch;
  }
}

export class TestRefDto extends IntersectionType(BaseUidDto, TestCoreDto) {
  constructor(entity: Test) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new TestCoreDto(entity));
  }
}

export class TestDto extends IntersectionType(BaseUpdateDto, TestRefDto) {
  @ApiProperty({ type: () => UserProfileRefDto })
  profile: UserProfileRefDto | null;

  @ApiProperty({ type: () => TestQuestionRefDto, isArray: true, nullable: true })
  questions: TestQuestionRefDto[] | null;

  @ApiProperty({ type: () => TestAttemptRefDto, isArray: true, nullable: true })
  attempts: TestAttemptRefDto[] | null;

  constructor(entity: Test) {
    super(entity);
    Object.assign(this, new BaseUpdateDto(entity));
    Object.assign(this, new TestRefDto(entity));

    this.profile = entity.profile
      ? new UserProfileRefDto(entity.profile)
      : null;
    this.questions = entity.questions?.length
      ? entity.questions.map(q => new TestQuestionRefDto(q))
      : null;
    this.attempts = entity.attempts?.length
      ? entity.attempts.map(a => new TestAttemptRefDto(a))
      : null;
  }
}

export class TestCreateDto extends PartialType(TestCore) {
  @ApiProperty({ example: 'f507a3a81f9e' })
  @Length(12, 12)
  profileUid!: string;
}

export class TestUpdateDto extends IntersectionType(BaseUidDto, PartialType(TestCreateDto)) { }
