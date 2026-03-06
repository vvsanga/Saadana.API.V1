import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AcdComparison } from "./comparison.entity";
import { AcdContent } from "./content.entity";

@Entity('Acd_Content_Comparisons')
export class AcdContentComparison extends BaseUpdateEntity {

  @Column({ type: 'int', default: 0 })
  order!: number;

  @ManyToOne(() => AcdContent, tc => tc.comparisons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content!: AcdContent;

  @ManyToOne(() => AcdComparison, tc => tc.contents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comparison_id' })
  comparison!: AcdComparison;
}
