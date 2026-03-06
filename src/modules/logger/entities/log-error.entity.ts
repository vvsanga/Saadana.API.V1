import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { LogRequest } from './log-request.entity';

@Entity('Log_Error')
export class LogError extends BaseCreateEntity {

  @ManyToOne(() => LogRequest, (req) => req.errors, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'requestId', referencedColumnName: 'id' })
  request!: LogRequest;

  @Index()
  @Column({ type: 'smallint' })
  status!: number;

  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  source?: string;
}
