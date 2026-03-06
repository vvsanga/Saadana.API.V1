import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class BasePasswordDto {
    @ApiProperty({
        description: 'Password for the new user',
        minLength: 6,
        maxLength: 100,
        example: 'StrongP@ssw0rd!',
    })
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password!: string;
}