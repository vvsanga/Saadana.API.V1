import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { AcdDiagram } from '../entities/diagram.entity';

@Injectable()
export class AcdDiagramService extends BaseCrudService<AcdDiagram> {
    constructor(@InjectRepository(AcdDiagram) repo: Repository<AcdDiagram>) {
        super(repo, { selectRelations: ['content'] });
    }
}
