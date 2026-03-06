import { Column, Entity, OneToMany } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { AcdComparisonItem } from "./comparison-item.entity";
import { AcdContentComparison } from "./content-comparison.entity";

@Entity('Acd_Comparisons')
export class AcdComparison extends BaseUpdateEntity {

    @Column({ length: 120 })
    title!: string;

    @Column({ length: 120 })
    topics!: string; // comma seperated numeric topic ids.

    @OneToMany(() => AcdComparisonItem, ci => ci.comparison)
    items!: AcdComparisonItem[];

    @OneToMany(() => AcdContentComparison, cc => cc.comparison)
    contents?: AcdContentComparison[];
}
