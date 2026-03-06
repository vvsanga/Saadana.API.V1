import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BaseTokenDto {
    @ApiProperty({ example: '3fr35hye77kkmng5', description: 'token' })
    @IsString()
    token: string;

    constructor(entity: { token: string }) {
        this.token = entity.token;
    }
}

export class BaseTokenWithExpiryDto extends BaseTokenDto {
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

    constructor(entity: { token: string, expiresAt: string, expiresSec: number }) {
        super(entity);
        this.expiresAt = entity.expiresAt;
        this.expiresSec = entity.expiresSec;
    }
}