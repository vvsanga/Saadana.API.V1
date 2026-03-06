import { Column, Entity, Index } from 'typeorm';
import { BaseCreateEntity } from '../../../../core/base/entities/base-create.entity';

@Entity({ name: 'Meta_Geo_Countries' })
@Index(['codeA2'], { unique: true })
@Index(['codeA3'], { unique: true })
@Index(['dialCode'])
export class MetaGeoCountry extends BaseCreateEntity {

  @Column({ type: 'char', length: 2 })
  continent!: string // 'AF', 'EU', 'AS', 'NA', 'SA', 'OC', 'AN'

  @Column({ length: 100 })
  name!: string

  @Column({ length: 100 })
  capital!: string

  @Column({ type: 'char', length: 2 })
  codeA2!: string

  @Column({ type: 'char', length: 3 })
  codeA3!: string

  @Column({ type: 'char', length: 3 })
  internetTld?: string // ".jp", ".de"

  @Column({ length: 15 })
  dialCode!: string // without '00' or '+'

  @Column({ type: 'char', length: 3 })
  curCode!: string

  @Column({ length: 50 })
  curName!: string

  @Column({ length: 5, nullable: true })
  curSymbol?: string

  @Column({ length: 100, nullable: true })
  olympicCode?: string

  @Column({ length: 100, nullable: true })
  largestCity?: string

  @Column({ length: 100, nullable: true })
  highestPoint?: string

  @Column({ length: 100, nullable: true })
  longestRiver?: string

  @Column({ length: 10, nullable: true })
  nationalBankAbbr?: string

  @Column({ length: 100, nullable: true })
  nationalBankName?: string

  @Column({ length: 100, nullable: true })
  nationalSport?: string

  @Column({ length: 100, nullable: true })
  nationalAnimal?: string

  @Column({ length: 100, nullable: true })
  nationalBird?: string

  @Column({ length: 100, nullable: true })
  nationalFlower?: string

  @Column({ length: 100, nullable: true })
  nationalAnthem?: string

  @Column({ length: 100, nullable: true })
  officialLanguage?: string

  @Column({ length: 100, nullable: true })
  religions?: string // comma-separated

  @Column({ type: 'char', length: 12 })
  flagUrl?: string // example iso 2 char may be in.png

  @Column({ length: 100, nullable: true })
  flagDescription?: string // “Red with white cross”

  @Column({ length: 100 })
  timeZones?: string // comma seperated may be

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude?: number

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude?: number

  @Column({ length: 100, nullable: true })
  globalOrgs?: string // comma seperated abbr not full names

  @Column({ type: 'boolean', nullable: true })
  isLandlocked?: boolean

  @Column({ type: 'boolean', nullable: true })
  isIsland?: boolean

  @Column({ type: 'boolean', nullable: true })
  hasDesert?: boolean

  @Column({ type: 'boolean', nullable: true })
  hasRainforest?: boolean

  @Column({ type: 'smallint', nullable: true })
  rankArea?: number

  @Column({ length: 50, nullable: true })
  neighborCountries?: string // comma sepearted iso 2 char codes only

  @Column({ type: 'char', length: '10', nullable: true })
  independenceDate?: string // YYYY-MM-DD Ex: 2026-01-30

  @Column({ length: 100, nullable: true })
  formerName?: string
}
