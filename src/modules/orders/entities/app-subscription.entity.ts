import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppPlan } from "../../infra/entities/app-plan.entity";
import { AppUser } from "../../user/entities/app-user.entity";
import { ESubscriptionStatus } from "../constants/order.enum";
import { AppOrder } from "./app-order.entity";
import { AppPayment } from "./app-payment.entity";

@Entity('App_Subscriptions')
export class AppSubscription extends BaseUpdateEntity {

  @ManyToOne(() => AppUser, (user) => user.subscriptions, {
    onDelete: 'SET NULL',
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: AppUser;

  @ManyToOne(() => AppPlan, (plan) => plan.subscriptions, {
    onDelete: 'SET NULL',
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'planId', referencedColumnName: 'id' })
  plan?: AppPlan;

  @ManyToOne(() => AppOrder, (order) => order.subscriptions, {
    onDelete: 'SET NULL',
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order?: AppOrder;

  @OneToOne(() => AppPayment, (payment) => payment.subscription, {
    onDelete: 'SET NULL',
    eager: false,
  })
  @JoinColumn({ name: 'paymentId', referencedColumnName: 'id' })
  payment?: AppPayment;

  @Column({ type: 'char', length: 3, default: ESubscriptionStatus.ACTIVE })
  status!: ESubscriptionStatus;

  @Column({ type: 'timestamptz', nullable: false })
  startDate!: Date;

  @Column({ type: 'timestamptz', nullable: false })
  endDate!: Date;
}
