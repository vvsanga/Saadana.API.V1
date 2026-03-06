import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { EPaymentStatus } from "../constants/order.enum";
import { AppPayment } from "./app-payment.entity";

@Entity('App_Payment_Sessions')
export class AppPaymentSession extends BaseCreateEntity {

  @ManyToOne(() => AppPayment, (payment) => payment.paymentSessions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'paymentId', referencedColumnName: 'id' })
  payment!: AppPayment;

  @Column({ type: 'varchar', length: 50 })
  provider!: string; // e.g. 'MOCK_GATEWAY' | 'STRIPE' | 'PAYPAL'

  @Column({ type: 'char', length: 4, default: EPaymentStatus.PENDING })
  status!: EPaymentStatus;
}
