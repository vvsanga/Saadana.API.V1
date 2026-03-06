import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { AcdSyllabus } from '../entities/syllabus.entity';

@Injectable()
export class AcdSyllabusService extends BaseCrudService<AcdSyllabus> {
    constructor(@InjectRepository(AcdSyllabus) repo: Repository<AcdSyllabus>) {
        super(repo, { selectRelations: ['parent'], allowSortFields: ['level', 'order'] });
    }
}

// @Injectable()
// export class SubjectsService extends BaseCrudService<AcdSyllabus> {
//     constructor(@InjectRepository(AcdSyllabus) repo: Repository<AcdSyllabus>) {
//         super(repo, { selectRelations: ['parent'], allowSortFields: ['level', 'order'] });
//     }
// }
