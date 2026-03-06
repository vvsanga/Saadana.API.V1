import { Column, Entity } from 'typeorm';
import { BaseCreateEntity } from '../../../../core/base/entities/base-create.entity';

@Entity({ name: 'Meta_Geo_Deserts' })
export class MetaGeoDesert extends BaseCreateEntity {

    @Column({ type: 'smallint', nullable: false, unique: true })
    rank!: number; // Rank by area (1 = largest)

    @Column({ type: 'varchar', length: 100, nullable: false })
    name!: string; // Desert name

    @Column({ type: 'bigint', nullable: false })
    areaKm2!: number; // Area in square kilometers

    @Column({ type: 'varchar', length: 20, nullable: false })
    type!: string; // Hot, Cold, Polar, Temperate

    @Column({ type: 'char', length: 2, nullable: false })
    continent!: string; // 2-char continent code (AF, AS, EU, etc.)

    @Column({ type: 'text', array: true, nullable: false })
    countries!: string[]; // Array of 2-char country codes
}
