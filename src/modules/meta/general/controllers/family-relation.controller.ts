import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../../../core/decorators/auth.decorator';
import { SuccessResponseMsg } from '../../../../core/decorators/response.decorator';
import { RelationDto, RelationRequestDto } from '../dtos/family-relation.dto';
import { FamilyRelationService } from '../services/family-relation.service';

@ApiTags('Meta Family Relations')
@Controller('meta/family/relations')
export class FamilyRelationController {
    constructor(private readonly service: FamilyRelationService) { }
    @PublicRoute()
    @Get('generate')
    @ApiOperation({ summary: 'Generate family relationship expressions' })
    @SuccessResponseMsg('Generated family relationship expressions successfully')
    async generate(@Body() payload: RelationRequestDto): Promise<RelationDto[]> {
        return this.service.generateMany(payload.count, payload.level);
    }
}
