import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsArray, Length, MaxLength } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { EnumUtil } from "../../../core/utils/enum.util";
import { TestRefDto } from "../../../modules/exam/dtos/test.dto";
import { EAcademicGrade } from "../constants/user.enum";
import { AppUserProfile } from "../entities/app-user-profile.entity";
import { UserRefDto } from "./user.dto";

class UserProfileCore {
  @ApiProperty({ description: 'Human-friendly name of the profile. Must be unique.', example: 'Maths Geometry Basics' })
  @MaxLength(50)
  name!: string;

  @ApiProperty({ description: 'Academic grade classification.', example: 'Grade03' })
  @MaxLength(7)
  grade!: string;

  @ApiPropertyOptional({ description: 'Optional list of topic labels.', example: ['algebra', 'fractions', 'geometry'], isArray: true })
  @IsArray()
  topics?: string[];
}

class UserProfileCoreDto extends UserProfileCore {
  constructor(entity?: AppUserProfile) {
    super();
    if (!entity) return;

    this.name = entity.name;
    this.grade = EnumUtil.getKey(EAcademicGrade, entity.grade);
    this.topics = entity.topics;
  }
}

export class UserProfileRefDto extends IntersectionType(BaseUidDto, UserProfileCoreDto) {
  constructor(entity: AppUserProfile) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new UserProfileCoreDto(entity));
  }
}

export class UserProfileDto extends IntersectionType(BaseUpdateDto, UserProfileRefDto) {

  @ApiProperty() user: UserRefDto | null;
  @ApiProperty() tests: TestRefDto[] | null;

  constructor(entity: AppUserProfile) {
    super(entity);
    Object.assign(this, new BaseUpdateDto(entity));
    Object.assign(this, new UserProfileRefDto(entity));

    this.user = entity.user
      ? new UserRefDto(entity.user)
      : null;
    this.tests = entity.tests?.length
      ? entity.tests?.map(s => new TestRefDto(s))
      : null;
  }
}

export class UserProfileCreateDto extends PartialType(UserProfileCore) {
  @ApiProperty({ example: 'f507a3a81f9e', description: 'Unique identifier' })
  @Length(12, 12)
  userUid!: string;
}

export class UserProfileUpdateDto extends IntersectionType(BaseUidDto, PartialType(UserProfileCreateDto)) { }
