import { Column, Entity, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { EMediaType } from "../constants/syllabus.enum";
import { AcdContentDiagram } from "./content-diagram.entity";

@Entity('Acd_Diagrams')
export class AcdDiagram extends BaseUpdateEntity {

  @Column({ type: 'enum', enum: EMediaType })
  media!: EMediaType;

  @Column({ length: 120 })
  title!: string;

  @Column({ length: 120 })
  url!: string;

  @OneToMany(() => AcdContentDiagram, td => td.diagram)
  contents?: AcdContentDiagram[];
}
