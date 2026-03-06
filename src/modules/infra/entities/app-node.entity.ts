import { Column, Entity, OneToMany } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { ENodeMaster } from "../constants/app.enum";
import { AppPlan } from "./app-plan.entity";

@Entity({ name: 'App_Nodes' })
export class AppNode extends BaseCreateEntity {

    @Column({ type: 'char', length: 1, nullable: false })
    master!: ENodeMaster;

    @Column({ type: 'smallint', default: 0 })
    order!: number;

    @Column({ type: 'varchar', length: 50 })
    label!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    avatar?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 511, nullable: true })
    descriptionLong?: string;

    @Column({ default: false })
    protected!: boolean;

    @Column('text', { array: true, nullable: true })
    meta?: string[];

    /* Relations */

    @OneToMany(() => AppPlan, (plan) => plan.node)
    plans!: AppPlan[];
}

