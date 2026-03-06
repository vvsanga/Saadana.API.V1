import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestAttempt } from "./entities/test-attempt.entity";
import { TestOption } from "./entities/test-option.entity";
import { TestQuestion } from "./entities/test-question.entity";
import { TestResult } from "./entities/test-result.entity";
import { Test } from "./entities/test.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Test,
            TestQuestion,
            TestOption,
            TestAttempt,
            TestResult
        ])
    ],
    providers: [
    ],
    controllers: [
    ]
})
export class ExamsModule { }
