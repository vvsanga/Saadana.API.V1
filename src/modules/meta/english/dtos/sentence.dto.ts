import { ApiProperty } from "@nestjs/swagger";
import { EAspect, ETense } from "../constants/eng.enum";

export class SentenceDto {
  @ApiProperty({
    example: 10,
    default: 10,
  })
  count!: number;

  @ApiProperty({
    enum: ETense,
    default: ETense.Present,
  })
  tense!: ETense;

  @ApiProperty({
    enum: EAspect,
    default: EAspect.Simple
  })
  aspect!: EAspect;
}
