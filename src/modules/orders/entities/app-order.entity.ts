import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppPlan } from "../../infra/entities/app-plan.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { EOrderStatus } from "../constants/order.enum";
import { AppOrderAmount } from "./app-order-amount.entity";
import { AppPayment } from "./app-payment.entity";
import { AppSubscription } from "./app-subscription.entity";

@Entity('App_Orders')
export class AppOrder extends BaseUpdateEntity {

    @ManyToOne(() => AppUser, (user) => user.orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user!: AppUser;

    @ManyToOne(() => AppPlan, (plan) => plan.orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'planId', referencedColumnName: 'id' })
    plan!: AppPlan;

    @Column({ type: 'char', length: 4, default: EOrderStatus.PENDING })
    status!: EOrderStatus;

    @Column({ type: 'char', length: 3, nullable: false })
    currency!: string;

    /* Relations */

    @OneToOne(() => AppSubscription, (sub) => sub.order)
    subscriptions?: AppSubscription[];

    @OneToMany(() => AppOrderAmount, (amount) => amount.order)
    amounts!: AppOrderAmount[];

    @OneToMany(() => AppPayment, (payment) => payment.order)
    payments!: AppPayment[];
}

