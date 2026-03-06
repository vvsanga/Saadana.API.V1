import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { LogRequest } from './log-request.entity';

@Entity('Log_Response')
export class LogResponse extends BaseCreateEntity {

    @Index()
    @ManyToOne(() => LogRequest, (req) => req.responses, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'requestId', referencedColumnName: 'id' })
    request!: LogRequest;

    @Index()
    @Column({ type: 'smallint', nullable: false })
    status!: number;

    @Column({ type: 'text', nullable: true })
    message!: string;

    @Column({ type: 'int', nullable: true })
    durationMs!: number;
}
