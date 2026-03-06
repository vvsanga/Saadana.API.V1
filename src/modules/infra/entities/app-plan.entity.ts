import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { AppOrder } from "../../../modules/orders/entities/app-order.entity";
import { AppSubscription } from "../../../modules/orders/entities/app-subscription.entity";
import { EBillMode, EPlanType } from "../constants/app.enum";
import { AppNode } from "./app-node.entity";

@Entity('App_Plans')
export class AppPlan extends BaseCreateEntity {

  @ManyToOne(() => AppNode, (node) => node.plans, {
    nullable: false,
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'nodeId' })
  node!: AppNode;

  @Column({ type: 'char', length: 1 })
  type!: EPlanType;

  @Column({ type: 'char', length: 1 })
  billMode!: EBillMode;

  @Column({ type: 'char', length: 3, default: 'INR' })
  currency!: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  actualPrice?: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  discountPrice?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountRate?: number;

  /* Relations */

  @OneToMany(() => AppSubscription, (sub) => sub.plan)
  subscriptions?: AppSubscription[];

  @OneToMany(() => AppOrder, (order) => order.plan)
  orders?: AppOrder[];

  @BeforeInsert()
  @BeforeUpdate()
  private calculateDiscountRate(): void {
    if (this.actualPrice != null && this.discountPrice != null) {
      this.discountRate = +(
        ((this.actualPrice - this.discountPrice) / this.actualPrice) * 100
      ).toFixed(2);
    }
  }
}
