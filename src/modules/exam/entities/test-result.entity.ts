import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { TestAttempt } from "./test-attempt.entity";
import { TestQuestion } from "./test-question.entity";

@Entity({ name: 'Test_Results' })
export class TestResult extends BaseUpdateEntity {

  @ManyToOne(() => TestAttempt, (attempt) => attempt.results, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'attemptId', referencedColumnName: 'id' })
  attempt!: TestAttempt;

  @ManyToOne(() => TestQuestion, (quest) => quest.results, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question!: TestQuestion;

  @Column({ type: 'jsonb', nullable: true })
  selectedOptions?: number[];

  @Column({ default: false })
  isCorrect!: boolean;
}