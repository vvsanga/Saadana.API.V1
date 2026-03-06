
import { Module } from '@nestjs/common';
import { FamilyRelationController } from './controllers/family-relation.controller';
import { FamilyRelationService } from './services/family-relation.service';

@Module({
    providers: [
        FamilyRelationService
    ],
    controllers: [
        FamilyRelationController
    ]
})
export class MetaGeneralModule { }
