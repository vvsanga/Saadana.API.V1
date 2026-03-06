import { Module } from '@nestjs/common';
import { SentencesController } from './controllers/sentence.controller';
import { StatementService } from './services/statement.service';

@Module({
    providers: [
        StatementService
    ],
    controllers: [
        SentencesController
    ]
})
export class MetaEnglishModule { }
