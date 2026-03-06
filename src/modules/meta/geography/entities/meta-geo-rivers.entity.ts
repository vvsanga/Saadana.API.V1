import { Column, Entity, Index } from 'typeorm';
import { BaseCreateEntity } from '../../../../core/base/entities/base-create.entity';

@Entity({ name: 'Meta_Geo_Rivers' })
@Index(['name'], { unique: true })
export class MetaGeoRiver extends BaseCreateEntity {

    /* Basic Info */
    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'char', length: 10, nullable: true })
    isoCode?: string;

    /* Measurements */
    @Column({ type: 'integer', nullable: true })
    lengthKm?: number;

    @Column({ type: 'integer', nullable: true })
    dischargeM3s?: number;

    @Column({ type: 'integer', nullable: true })
    basinAreaKm2?: number;

    /* Rankings */
    @Column({ type: 'smallint', nullable: true })
    rankLength?: number;

    @Column({ type: 'smallint', nullable: true })
    rankDischarge?: number;

    /* Geography */
    @Column({ type: 'varchar', length: 100, nullable: true })
    source?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    mouth?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    continent?: string; // ISO-2 continent code

    @Column({ type: 'char', length: 2, array: true, nullable: true })
    countries?: string[]; // ISO-2 country codes
}
