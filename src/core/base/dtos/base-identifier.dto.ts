import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BaseIdentifierDto {
    @ApiProperty({ description: 'A valid mail id or phone' })
    @IsNotEmpty({ message: 'Identifier is required' })
    identifier!: string;
}