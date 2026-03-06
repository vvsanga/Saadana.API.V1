import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseReadOnlyController } from '../../../core/base/controllers/base-read-only.controller';
import { ApiReadonly } from '../../../core/decorators/api-readonly.decorator';
import { PublicRoute } from '../../../core/decorators/auth.decorator';
import { AcdSyllabusDto } from '../../../modules/academic/dtos/syllabus.dto';
import { AcdSyllabus } from '../../../modules/academic/entities/syllabus.entity';
import { SyllabusService } from '../services/syllabus.service';

@PublicRoute()
@ApiTags('App Syllabus')
@Controller('app/syllabus')
@ApiReadonly(AcdSyllabusDto)
export class SyllabusController extends BaseReadOnlyController<
    AcdSyllabus,
    AcdSyllabusDto
> {
    constructor(protected readonly api: SyllabusService) {
        super(api, AcdSyllabusDto);
    }
}
