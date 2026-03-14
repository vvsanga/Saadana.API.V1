import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { AcdSyllabusCreateDto, AcdSyllabusDto, AcdSyllabusUpdateDto } from '../dtos/syllabus.dto';
import { AcdSyllabus } from '../entities/syllabus.entity';
import { AcdSyllabusService } from '../services/syllabus.service';

@ApiTags('Academic Syllabus')
@Controller('academic/syllabus')
@ApiCrud(AcdSyllabusCreateDto, AcdSyllabusUpdateDto, AcdSyllabusDto)
export class AcdSyllabusController extends BaseCrudController<
    AcdSyllabus,
    AcdSyllabusCreateDto,
    AcdSyllabusUpdateDto,
    AcdSyllabusDto
> {
    constructor(protected readonly api: AcdSyllabusService) {
        super(api, AcdSyllabusDto);
    }
}
