import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { AcdDiagramCreateDto, AcdDiagramDto, AcdDiagramUpdateDto } from '../dtos/diagram.dto';
import { AcdDiagram } from '../entities/diagram.entity';
import { AcdDiagramService } from '../services/diagram.service';

@InternalRoute()
@ApiTags('Academic Diagrams')
@Controller('academic/diagrams')
@ApiCrud(AcdDiagramCreateDto, AcdDiagramUpdateDto, AcdDiagramDto)
export class AcdDiagramController extends BaseCrudController<
    AcdDiagram,
    AcdDiagramCreateDto,
    AcdDiagramUpdateDto,
    AcdDiagramDto
> {
    constructor(protected readonly api: AcdDiagramService) {
        super(api, AcdDiagramDto);
    }
}
