import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseUidDto } from '../../../core/base/dtos/base-uid.dto';
import { AcdComparisonRefDto } from './comparison.dto';
import { AcdContentRefDto } from './content.dto';
import { AcdDiagramRefDto } from './diagram.dto';

export class AcdTopicDiagramDto extends BaseUidDto {
    // @ApiProperty() uid!: string;
    @ApiProperty() order!: number;
    @ApiProperty({ type: () => AcdDiagramRefDto })
    diagram!: AcdDiagramRefDto;
}

export class AcdTopicComparisonDto extends BaseUidDto {
    // @ApiProperty() uid!: string;
    @ApiProperty() order!: number;
    @ApiProperty({ type: () => AcdComparisonRefDto })
    comparison!: AcdComparisonRefDto;
}

export class TopicContentDto {
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    definitions?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    keyPoints?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    formulas?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    classifications?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    examples?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdContentRefDto })
    remembers?: AcdContentRefDto[];
    @ApiPropertyOptional({ type: () => AcdTopicDiagramDto })
    diagrams?: AcdTopicDiagramDto[];
    @ApiPropertyOptional({ type: [AcdTopicComparisonDto] })
    comparisons?: AcdTopicComparisonDto[];
}
