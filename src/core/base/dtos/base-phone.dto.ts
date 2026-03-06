import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsPhoneNumberE164 } from "../../../core/validators/phone-number.validator";

export class BasePhoneDto {

    @ApiProperty({ description: 'Phone number to which the OTP was sent in E.164 format', example: '+911234567890' })
    @IsPhoneNumberE164()
    @IsNotEmpty()
    phone!: string;

    constructor(entity?: { phone?: string }) {
        if (entity?.phone) {
            this.phone = entity.phone;
        }
    }
}
