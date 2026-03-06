import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class BaseEmailDto {

    @ApiProperty({ description: 'A valid mail id', example: 'user1@example.com', format: 'email' })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    constructor(entity: { email?: string }) {
        this.email = entity.email!;
    }
}