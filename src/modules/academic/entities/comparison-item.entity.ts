import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AcdComparison } from "./comparison.entity";

@Entity('Acd_Comparison_Items')
export class AcdComparisonItem extends BaseUpdateEntity {

  @ManyToOne(() => AcdComparison, c => c.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comparison_id', referencedColumnName: 'id' })
  comparison!: AcdComparison;

  @Column({ type: 'int', default: 0 })
  orderRow!: number;

  @Column({ type: 'int', default: 0 })
  orderCol!: number;

  @Column({ length: 500 })
  content!: string;
}
