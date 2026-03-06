import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { EAcdContentType } from "../constants/syllabus.enum";
import { AcdContentComparison } from "./content-comparison.entity";
import { AcdContentDiagram } from "./content-diagram.entity";
import { AcdSyllabus } from "./syllabus.entity";

@Entity('Acd_Content')
export abstract class AcdContent extends BaseUpdateEntity {

  @ManyToOne(() => AcdSyllabus, topic => topic.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic!: AcdSyllabus;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'char', length: 1 })
  type!: EAcdContentType;

  @Column({ length: 120 })
  title!: string;

  @Column({ type: 'varchar', length: 500 })
  content!: string;

  @OneToMany(() => AcdContentDiagram, cd => cd.content)
  diagrams?: AcdContentDiagram[];

  @OneToMany(() => AcdContentComparison, cc => cc.content)
  comparisons?: AcdContentComparison[];
}
