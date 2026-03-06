import { Injectable } from "@nestjs/common";
import { SentenceDto } from "../dtos/sentence.dto";
import { GetRandomSubjectAndVerb } from "../utils/sentence.util";
import { GenerateSentence } from "../utils/tenses.util";

@Injectable()
export class StatementService {

    GetSentences(model: SentenceDto): string[] {
        const data: string[] = [];
        for (let i = 0; i < model.count; i++) {
            const { subject, verb, object } = GetRandomSubjectAndVerb();
            data.push(GenerateSentence({ subject, verb, object, tense: model.tense, aspect: model.aspect }));
        }
        return data;
    }
}