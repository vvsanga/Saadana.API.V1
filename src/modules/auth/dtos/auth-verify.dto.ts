import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { BaseIdentifierDto } from '../../../core/base/dtos/base-identifier.dto';
import { BaseOtpDto, BaseOtpWithExpiryDto } from '../../../core/base/dtos/base-otp.dto';

export class OtpIssueRequestDto extends BaseIdentifierDto {
    @ApiProperty({ example: 'email', description: 'Channel used for OTP delivery' })
    channel!: 'email' | 'phone';
}

export class OtpValidateRequestDto extends IntersectionType(OtpIssueRequestDto, BaseOtpDto) { }

export class OtpResponseDto extends BaseOtpWithExpiryDto { }
