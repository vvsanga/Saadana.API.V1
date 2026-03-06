import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../../../core/decorators/auth.decorator';
import { SentenceDto } from '../dtos/sentence.dto';
import { StatementService } from '../services/statement.service';

@ApiTags('Meta Eng Sentences')
@Controller('meta/english/sentence')
export class SentencesController {
    constructor(private statementService: StatementService) { }
    @PublicRoute()
    @Post()
    async fetch(@Body() model: SentenceDto): Promise<string[]> {
        return this.statementService.GetSentences(model);
    }
}
