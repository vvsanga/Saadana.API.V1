import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseIdentifierDto } from "../../../core/base/dtos/base-identifier.dto";
import { BasePasswordDto } from "../../../core/base/dtos/base-password.dto";
import { UserDto } from "../../../modules/user/dtos/user.dto";
import { OtpIssueRequestDto, OtpValidateRequestDto } from "./auth-verify.dto";

class TokenBase {
  @ApiProperty({
    description: "JWT string to be used in Authorization header.",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  token!: string;

  @ApiProperty({
    description: "Token lifetime (in seconds).",
    example: 900,
  })
  expiresSec!: number;

  @ApiProperty({
    description: "Exact UTC date/time when the token expires.",
    example: "2025-08-18T10:20:30.000Z",
  })
  expiresAt!: Date;
}

export class LoginOAuthRequestDto {
  @ApiProperty({ description: 'OAuth provider' })
  @IsString()
  provider!: string;

  @ApiProperty({
    description: "JWT string to be used in Authorization header.",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  token!: string;
}

export class LoginPasswordRequestDto extends IntersectionType(BaseIdentifierDto, BasePasswordDto) {
  @ApiProperty({ example: 'email', description: 'Channel used for OTP delivery' })
  channel!: 'email' | 'phone';
}

export class LoginOtpIssueRequestDto extends OtpIssueRequestDto { }

export class LoginOtpValidateRequestDto extends OtpValidateRequestDto { }

export class LoginResponseDto {
  @ApiProperty({
    description: "JWT Access Token (short-lived).",
    type: TokenBase,
  })
  accessToken!: TokenBase;

  @ApiProperty({
    description: "JWT Refresh Token (long-lived).",
    type: TokenBase,
  })
  refreshToken!: TokenBase;

  @ApiProperty({
    description: "User details.",
    type: () => UserDto,
  })
  user!: UserDto;
}

export class RegisterRequestDto extends LoginPasswordRequestDto { }

export class RegisterResponseDto extends LoginResponseDto { }

export class RefreshRequestDto {
  @ApiProperty({
    description: "Refresh token of the active session.",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  refreshToken!: string;
}

export class RefreshResponseDto extends LoginResponseDto { }
