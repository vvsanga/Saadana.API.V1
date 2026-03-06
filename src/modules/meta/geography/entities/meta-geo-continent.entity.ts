import { Column, Entity, Index, OneToMany } from "typeorm"
import { BaseCreateEntity } from "../../../../core/base/entities/base-create.entity"
import { MetaGeoCountry } from "./meta-geo-country.entity"

@Entity({ name: 'Meta_Geo_Continents' })
@Index(['code'], { unique: true })
@Index(['name'], { unique: true })
export class MetaGeoContinent extends BaseCreateEntity {
    @Column({ length: 5, unique: true })
    code!: string

    @Column({ length: 50, unique: true })
    name!: string

    @Column({ length: 50, nullable: true })
    regionGroup?: string

    @Column({ type: 'smallint', nullable: true })
    countryCount?: number

    @Column({ type: 'smallint', nullable: true })
    rankPopulation?: number

    @Column({ type: 'smallint', nullable: true })
    rankArea?: number

    @Column({ type: 'smallint', nullable: true })
    rankDensity?: number

    @Column({ type: 'smallint', nullable: true })
    rankCountryCount?: number

    @Column({ type: "char", length: 2, nullable: true })
    largestCountry?: string // CodeA2

    @Column({ type: "char", length: 2, nullable: true })
    smallestCountry?: string // CodeA2

    @Column({ length: 100, nullable: true })
    highestMountain?: string

    @Column({ length: 100, nullable: true })
    longestRiver?: string

    @Column({ length: 100, nullable: true })
    largestDesert?: string

    // ---- Relation ----
    @OneToMany(() => MetaGeoCountry, (country) => country.continent)
    countries?: MetaGeoCountry[]
}
