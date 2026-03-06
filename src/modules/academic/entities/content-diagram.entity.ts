import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AcdContent } from "./content.entity";
import { AcdDiagram } from "./diagram.entity";

@Entity('Acd_Content_Diagrams')
export class AcdContentDiagram extends BaseUpdateEntity {

  @Column({ type: 'int', default: 0 })
  order!: number;

  @ManyToOne(() => AcdContent, tc => tc.diagrams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content!: AcdContent;

  @ManyToOne(() => AcdDiagram, td => td.contents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diagram_id' })
  diagram!: AcdDiagram;
}
