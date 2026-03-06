import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { TestResult } from "./test-result.entity";
import { Test } from "./test.entity";

@Entity({ name: 'Test_Attempts' })
export class TestAttempt extends BaseUpdateEntity {

  @Index()
  @ManyToOne(() => AppUser, (user) => user.tests, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: AppUser;

  @Index()
  @ManyToOne(() => Test, (test) => test.attempts, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'testId', referencedColumnName: 'id' })
  test!: Test;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  startAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  submitAt?: Date;

  @Column({ default: false })
  isAutoSubmit!: boolean;

  @Column({ type: 'smallint', default: 0 })
  score!: number;

  @Column({ type: 'smallint', default: 1 })
  attemptCount!: number;

  @Column({ type: 'smallint', default: 0 })
  tabSwitchCount!: number;

  /* Relations */

  @OneToMany(() => TestResult, (result) => result.attempt)
  results!: TestResult[];
}
