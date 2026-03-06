import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { LogRequest } from "./log-request.entity";

@Entity("Log_Device")
export class LogDevice extends BaseCreateEntity {
    @Index()
    @Column({ type: "varchar", length: 45, nullable: false }) // supports IPv4 + IPv6
    ip!: string;

    @Column({ type: "text", nullable: false })
    timezone!: string;

    @Column({ type: "text", nullable: true })
    geo?: string;

    @Column({ type: "text", nullable: true })
    agent?: string;

    /* Relations */

    @OneToMany(() => LogRequest, (req) => req.device)
    requests!: LogRequest[];
}
