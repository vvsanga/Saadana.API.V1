import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppUserProfile } from "../../../modules/user/entities/app-user-profile.entity";
import { EDifficultyLevel, EScoreMode } from "../constants/exam.enum";
import { TestAttempt } from "./test-attempt.entity";
import { TestQuestion } from "./test-question.entity";

@Entity({ name: 'Tests' })
export class Test extends BaseUpdateEntity {

  @ManyToOne(() => AppUserProfile, (profile) => profile.tests, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile!: AppUserProfile;

  @Index()
  @Column({ type: 'text', nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  difficultyLevel?: EDifficultyLevel;

  @Column({ type: 'char', length: 1, default: EScoreMode.SIMPLE })
  scoreMode!: EScoreMode;

  @Column({ type: 'smallint', default: 1 })
  totalQuestions!: number;

  @Column({ type: 'smallint', default: 1 })
  pointsPerQuestion!: number;

  @Column({ type: 'smallint', nullable: true })
  passingPoints?: number;

  @Column({ type: 'smallint', default: 1 })
  durationMins!: number;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  publishAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  resultAt?: Date;

  @Column({ type: 'char', length: 12, nullable: true })
  accessToken!: string;

  @Column({ type: 'smallint', default: 1 })
  maxAttempts!: number;

  @Column({ default: false })
  shuffleQuestions!: boolean;

  @Column({ default: false })
  shuffleOptions!: boolean;

  @Column({ default: false })
  showResult!: boolean;

  @Column({ default: false })
  showAnswer!: boolean;

  @Column({ default: false })
  allowPause!: boolean;

  @Column({ type: 'smallint', default: 0 })
  allowTabSwitch!: number;

  /* Relations */

  @OneToMany(() => TestQuestion, (quest) => quest.test)
  questions!: TestQuestion[];

  @OneToMany(() => TestAttempt, (attempt) => attempt.test)
  attempts!: TestAttempt[];
}
