import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { TestQuestion } from "./test-question.entity";

@Entity({ name: 'Test_Options' })
export class TestOption extends BaseUpdateEntity {

  @ManyToOne(() => TestQuestion, (quest) => quest.options, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question!: TestQuestion;

  @Column({ type: 'text' })
  expression!: string;

  @Column({ default: false })
  isCorrect!: boolean;

  @Column({ type: 'smallint', nullable: false })
  order?: number;
}