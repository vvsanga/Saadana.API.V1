import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class BaseOtpDto {
    @ApiProperty({ example: '9891', description: '4-digit numeric OTP' })
    @Matches(/^\d{4}$/, { message: 'OTP must be a 4-digit number' })
    otp: string;

    constructor(entity: { otp: string }) {
        this.otp = entity.otp;
    }
}

export class BaseOtpWithExpiryDto extends BaseOtpDto {
    @ApiProperty({
        example: '2025-06-28T12:00:00.000Z',
        description: 'Expiration timestamp in ISO 8601 format',
        type: String,
        format: 'date-time',
    })
    expiresAt: string;

    @ApiProperty({
        example: 300,
        description: 'Time in seconds until expiration (e.g., 300 = 5 Mins)',
        type: Number,
    })
    expiresSec: number;

    constructor(entity: { otp: string, expiresAt: string, expiresSec: number }) {
        super(entity);
        this.expiresAt = entity.expiresAt;
        this.expiresSec = entity.expiresSec;
    }
}