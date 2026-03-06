
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { EAmountType } from "../constants/order.enum";
import { AppOrder } from "./app-order.entity";

@Entity('App_Order_Amounts')
export class AppOrderAmount extends BaseCreateEntity {

    @ManyToOne(() => AppOrder, (order) => order.amounts, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order!: AppOrder;

    @Column({ type: 'varchar', length: 10, nullable: false })
    type!: EAmountType;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    amount!: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    remark?: string;
}
