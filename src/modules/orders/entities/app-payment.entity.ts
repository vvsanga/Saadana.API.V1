import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { EPaymentMethod, EPaymentStatus } from "../constants/order.enum";
import { AppOrder } from "./app-order.entity";
import { AppPaymentSession } from "./app-payment-session.entity";
import { AppSubscription } from "./app-subscription.entity";

@Entity('App_Payments')
export class AppPayment extends BaseUpdateEntity {

  @ManyToOne(() => AppUser, (user) => user.payments, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: AppUser;

  @ManyToOne(() => AppOrder, (order) => order.payments, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order!: AppOrder;

  @Column({ type: 'char', length: 4, default: EPaymentStatus.PENDING })
  status!: EPaymentStatus;

  @Column({ type: 'char', length: 3, nullable: false })
  method!: EPaymentMethod;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'char', length: 3 })
  currency!: string;

  /* Relations */

  @OneToOne(() => AppSubscription, (subscription) => subscription.payment)
  subscription?: AppSubscription;

  @OneToMany(() => AppPaymentSession, (session) => session.payment)
  paymentSessions!: AppPaymentSession[];
}
