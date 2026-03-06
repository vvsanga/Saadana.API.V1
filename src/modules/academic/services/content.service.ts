import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NestedCrudService } from "../../../core/base/services/nested-crud.service";
import { EAcdContentType } from "../constants/syllabus.enum";
import { AcdContent } from "../entities/content.entity";
import { AcdSyllabus } from "../entities/syllabus.entity";

@Injectable()
export class AcdContentService extends NestedCrudService<AcdContent, AcdSyllabus> {
    constructor(
        @InjectRepository(AcdContent) repo: Repository<AcdContent>,
        @InjectRepository(AcdSyllabus) parentRepo: Repository<AcdSyllabus>,
    ) {
        super(
            repo,
            parentRepo,
            'topic',
            {
                selectRelations: ['diagrams', 'diagrams.diagram', 'comparisons', 'comparisons.comparison'],
                enumFields: { type: EAcdContentType },
            },
        );
    }
}
