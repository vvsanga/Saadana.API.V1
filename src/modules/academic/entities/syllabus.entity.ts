import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { AcdContent } from "./content.entity";

@Entity({ name: 'Acd_Syllabus' })
export class AcdSyllabus extends BaseCreateEntity {

    @ManyToOne(() => AcdSyllabus, (par) => par.children, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    parent!: AcdSyllabus;

    @Column({ type: 'varchar', length: 9, nullable: true })
    code?: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    label!: string;

    @Column({ type: 'smallint', nullable: false })
    gradeFrom!: number;

    @Column({ type: 'smallint', nullable: false })
    gradeTo!: number;

    @Column({ type: 'smallint', nullable: false })
    order!: number;

    @Column({ type: 'smallint', default: 0 })
    level!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    avatar?: string;

    @Column({ type: "boolean", default: true })
    enableSheets!: boolean;

    @Column({ type: "boolean", default: true })
    enableGames!: boolean;

    @Column({ type: "boolean", default: true })
    enableTests!: boolean;

    @Column({ type: "boolean", default: true })
    enableBoards!: boolean;

    @Column({ type: "boolean", default: true })
    enableNotes!: boolean;

    /* Relations */

    @OneToMany(() => AcdSyllabus, child => child.parent)
    children?: AcdSyllabus[];

    @OneToMany(() => AcdContent, c => c.topic)
    content?: AcdContent[];
}
