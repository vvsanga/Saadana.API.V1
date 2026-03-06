import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { LogDevice } from "./log-device.entity";
import { LogError } from "./log-error.entity";
import { LogResponse } from "./log-response.entity";

@Entity("Log_Request")
export class LogRequest extends BaseCreateEntity {

    @Index()
    @ManyToOne(() => AppUser, (user) => user.requests, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user?: AppUser;

    @Index()
    @ManyToOne(() => LogDevice, (device) => device.requests, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'deviceId', referencedColumnName: 'id' })
    device!: LogDevice;

    @Column({ type: "text", nullable: false })
    @Index()
    action!: string;

    @Column({ type: "jsonb", nullable: true })
    payload?: any;

    /* Relations */

    @OneToMany(() => LogResponse, (logRes) => logRes.request)
    responses?: LogResponse[];

    @OneToMany(() => LogError, (logErr) => logErr.request)
    errors?: LogError[];
}
