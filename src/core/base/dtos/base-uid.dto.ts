import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class BaseUidDto {
    @ApiProperty({ description: 'Unique public identifier', example: 'f507a3a81f9e' })
    @Length(12, 12)
    uid!: string;

    constructor(entity?: { uid?: string }) {
        if (entity?.uid) this.uid = entity.uid;
    }
}
