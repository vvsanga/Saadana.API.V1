import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { BaseEmailDto } from '../../../core/base/dtos/base-mail.dto';
import { BaseUidDto } from '../../../core/base/dtos/base-uid.dto';
import { BaseUpdateDto } from '../../../core/base/dtos/base-update.dto';
import { ERole } from '../../../core/decorators/roles.decorator';
import { EnumUtil } from '../../../core/utils/enum.util';
import { EAuthProvider } from '../../../modules/auth/constants/auth.enum';
import { LoginPasswordRequestDto } from '../../../modules/auth/dtos/auth-access.dto';
import { SubscriptionRefDto } from '../../../modules/orders/dtos/subscription.dto';
import { AppUser } from '../entities/app-user.entity';
import { UserProfileRefDto } from './user-profile.dto';

class UserCore {

  @ApiPropertyOptional({ description: 'First name', example: 'Jane', maxLength: 50 })
  @MaxLength(50)
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name', example: 'Doe', maxLength: 50 })
  @MaxLength(50)
  lastName?: string;

  @ApiPropertyOptional({ description: 'Avatar URL', example: 'https://example.com/avatar.png' })
  avatar?: string;

  @ApiPropertyOptional({ description: 'Phone number in E.164 format', example: '+1234567890' })
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: 'user', description: 'user role.' })
  @IsString()
  role?: string;
}

class UserCoreDto extends UserCore {

  @ApiProperty() isInternal?: boolean;
  @ApiProperty() isEmailVerified?: boolean;
  @ApiProperty() isPhoneVerified?: boolean;
  @ApiProperty() passwordChangedAt?: Date;

  constructor(entity?: AppUser) {
    super();
    if (!entity) return;

    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.avatar = entity.avatar;
    this.phone = entity.phone;
    this.isInternal = entity.isInternal;
    this.isEmailVerified = entity.isEmailVerified;
    this.isPhoneVerified = entity.isPhoneVerified;
    this.passwordChangedAt = entity.passwordChangedAt;
    this.role = entity.role ? EnumUtil.getKey(ERole, entity.role) : undefined;
  }
}

export class UserRefDto extends IntersectionType(BaseUidDto, BaseEmailDto, UserCoreDto) {
  constructor(entity: AppUser) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new BaseEmailDto(entity));
    Object.assign(this, new UserCoreDto(entity));
  }
}

export class UserDto extends IntersectionType(BaseUpdateDto, UserRefDto) {
  @ApiProperty() provider: string | null;
  @ApiProperty() profiles: UserProfileRefDto[] | null;
  @ApiProperty() subscriptions: SubscriptionRefDto[] | null;

  constructor(entity: AppUser) {
    super(entity);
    Object.assign(this, new BaseUpdateDto(entity));
    Object.assign(this, new UserRefDto(entity));

    this.provider = entity.providers?.length === 1
      ? EnumUtil.getKey(EAuthProvider, entity.providers[0].provider)
      : null;
    this.profiles = entity.profiles?.length
      ? entity.profiles?.map(p => new UserProfileRefDto(p))
      : null;
    this.subscriptions = entity.subscriptions?.length
      ? entity.subscriptions?.map(s => new SubscriptionRefDto(s))
      : null;
  }
}

export class UserCreateDto extends IntersectionType(LoginPasswordRequestDto, PartialType(UserCore)) { }

export class UserUpdateDto extends IntersectionType(BaseUidDto, PartialType(UserCore)) { }
