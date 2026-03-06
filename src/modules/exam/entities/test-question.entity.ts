import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { EDifficultyLevel, EQuestionType } from "../constants/exam.enum";
import { TestOption } from "./test-option.entity";
import { TestResult } from "./test-result.entity";
import { Test } from "./test.entity";

@Entity({ name: 'Test_Questions' })
export class TestQuestion extends BaseUpdateEntity {

    @ManyToOne(() => Test, (test) => test.questions, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'testId', referencedColumnName: 'id' })
    test!: Test;

    @Column({ type: 'char', length: 1, nullable: true })
    difficultyLevel?: EDifficultyLevel;

    @Column({ type: 'text', nullable: true })
    topic!: string;

    @Column({ type: 'text' })
    expression!: string;

    @Column({ type: 'smallint', default: EQuestionType.One })
    type!: EQuestionType;

    @Column({ type: 'smallint', nullable: true })
    order!: number;

    @Column({ type: 'smallint', default: 1 })
    points!: number;

    /* Relations */

    @OneToMany(() => TestOption, (option) => option.question)
    options!: TestOption[];

    @OneToMany(() => TestResult, (result) => result.question)
    results!: TestResult[];
}