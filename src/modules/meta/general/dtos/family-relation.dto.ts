import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { EDifficultyLevel } from '../models/family-relation.model';

export class RelationRequestDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50000)
    @ApiProperty({ example: 10, description: 'Number of records to generate' })
    count?: number = 10;

    @IsOptional()
    @IsEnum(EDifficultyLevel)
    @ApiProperty({
        example: EDifficultyLevel.MEDIUM,
        enum: EDifficultyLevel,
        description: 'Difficulty level controlling relationship depth',
    })
    level?: EDifficultyLevel = EDifficultyLevel.MEDIUM;
}

export class RelationDto {
    @ApiProperty({
        example: "Who is your mother's brother's son?",
        description: 'Generated question text',
    })
    question!: string;

    @ApiProperty({ example: 'cousin', description: 'Correct answer' })
    answer!: string;

    @ApiProperty({
        example: EDifficultyLevel.MEDIUM,
        enum: EDifficultyLevel,
        description: 'Difficulty level of this question',
    })
    level!: EDifficultyLevel;

    @ApiProperty({
        example: ['cousin', 'uncle', 'brother', 'nephew'],
        description: 'Multiple-choice options (includes correct one)',
    })
    options!: string[];
}
