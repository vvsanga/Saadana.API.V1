import { Column, Entity, Index } from 'typeorm';
import { BaseCreateEntity } from '../../../../core/base/entities/base-create.entity';
import { ECoastalType, EColor, ETemperature, EWaterBodyType, EWaterClarity, EWaterSalinity } from '../models/meta-geo.model';

@Entity({ name: 'Meta_Geo_Water_Bodies' })
@Index(['name'], { unique: true })
export class MetaGeoWaterBody extends BaseCreateEntity {

    /* Classification */

    @Column({ type: 'char', length: 1 })
    type!: EWaterBodyType;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    isoCode?: string;

    @Column({ type: 'boolean', default: false })
    drinkable!: boolean;

    @Column({ type: 'boolean', nullable: true })
    seasonallyFrozen?: boolean;

    @Column({ type: 'char', length: 1, nullable: true })
    temperature?: ETemperature;

    @Column({ type: 'char', length: 1, nullable: true })
    salinity?: EWaterSalinity;

    @Column({ type: 'char', length: 1, nullable: true })
    color?: EColor;

    @Column({ type: 'char', length: 1, nullable: true })
    clarity?: EWaterClarity;

    @Column({ type: 'char', length: 1, nullable: true })
    coastalType?: ECoastalType;

    @Column({ type: 'char', length: 1, nullable: true })
    oxygenLevel?: 'L' | 'M' | 'H';

    /* Rankings */

    @Column({ type: 'smallint', nullable: true })
    rankArea?: number;

    @Column({ type: 'smallint', nullable: true })
    rankDepth?: number;

    /* Measurements */

    @Column({ type: 'integer', nullable: true })
    areaKm2?: number;

    @Column({ type: 'integer', nullable: true })
    maxDepthM?: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    deepestPoint?: string;

    @Column({ type: 'smallint', nullable: true })
    avgTempC?: number;

    /* Geography */

    @Column({ type: 'varchar', length: 50, nullable: true })
    ocean?: string; // e.g. PACIFIC, ATLANTIC // connected ocean

    @Column({ type: 'char', length: 2, array: true, nullable: true })
    continents?: string[]; // ISO-2 continent codes

    @Column({ type: 'char', length: 2, array: true, nullable: true })
    countries?: string[]; // ISO-2 country codes // border countries

    /* Metadata */

    @Column({ type: 'text', nullable: true })
    description?: string;
}
