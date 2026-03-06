import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";

@Entity("Auth_Sessions")
export class AuthSession extends BaseUpdateEntity {

    @OneToOne(() => AppUser, (user) => user.session, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user!: AppUser;

    @Column({ type: "int", default: 0 })
    failedLogins!: number;

    @Column({ type: "timestamptz", nullable: true })
    lastFailedLoginAt?: Date;

    @Column({ type: "timestamptz", nullable: true })
    lastSuccessLoginAt?: Date;

    @Column({ type: "timestamptz", nullable: true })
    lockoutUntil?: Date;

    @Column({ type: "boolean", default: false })
    isSuspended!: boolean;

    @Column({ type: "int", default: 5 })
    maxActive!: number; // this need to be change to active sessions to be increment/decrement
}
