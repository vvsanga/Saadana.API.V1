import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger'
import { IsDateString, IsLatitude, IsLongitude, Length, MaxLength } from 'class-validator'
import { BaseCreateDto } from '../../../../core/base/dtos/base-create.dto'
import { BaseUidDto } from '../../../../core/base/dtos/base-uid.dto'
import { MetaGeoCountry } from '../entities/meta-geo-country.entity'

export class GeoCountryCreateDto {

    @ApiProperty({ example: 'AS', maxLength: 2 })
    @Length(2, 2)
    continent!: string

    @ApiProperty({ example: 'Japan', maxLength: 100 })
    @MaxLength(100)
    name!: string

    @ApiProperty({ example: 'Tokyo', maxLength: 100 })
    @MaxLength(100)
    capital!: string

    @ApiProperty({ example: 'JP', maxLength: 2 })
    @Length(2, 2)
    codeA2!: string

    @ApiProperty({ example: 'JPN', maxLength: 3 })
    @Length(3, 3)
    codeA3!: string

    @ApiPropertyOptional({ example: '.jp', maxLength: 3 })
    @Length(2, 3)
    internetTld?: string

    @ApiProperty({ example: '81', maxLength: 15 })
    @MaxLength(15)
    dialCode!: string

    @ApiProperty({ example: 'JPY', maxLength: 3 })
    @Length(3, 3)
    curCode!: string

    @ApiProperty({ example: 'Yen', maxLength: 50 })
    @MaxLength(50)
    curName!: string

    @ApiPropertyOptional({ example: '¥', maxLength: 5 })
    @MaxLength(5)
    curSymbol?: string

    @ApiPropertyOptional({ example: 'JPN', maxLength: 100 })
    @MaxLength(100)
    olympicCode?: string

    @ApiPropertyOptional({ example: 'Tokyo', maxLength: 100 })
    @MaxLength(100)
    largestCity?: string

    @ApiPropertyOptional({ example: 'Mount Fuji', maxLength: 100 })
    @MaxLength(100)
    highestPoint?: string

    @ApiPropertyOptional({ example: 'Shinano River', maxLength: 100 })
    @MaxLength(100)
    longestRiver?: string

    @ApiPropertyOptional({ example: 'RBI', maxLength: 100 })
    @MaxLength(100)
    nationalBankAbbr?: string

    @ApiPropertyOptional({ example: 'RBI', maxLength: 100 })
    @MaxLength(100)
    nationalBankName?: string

    @ApiPropertyOptional({ example: 'Sumo', maxLength: 100 })
    @MaxLength(100)
    nationalSport?: string

    @ApiPropertyOptional({ example: 'Green Pheasant', maxLength: 100 })
    @MaxLength(100)
    nationalAnimal?: string

    @ApiPropertyOptional({ example: 'Green Pheasant', maxLength: 100 })
    @MaxLength(100)
    nationalBird?: string

    @ApiPropertyOptional({ example: 'Cherry Blossom', maxLength: 100 })
    @MaxLength(100)
    nationalFlower?: string

    @ApiPropertyOptional({ example: 'Kimigayo', maxLength: 100 })
    @MaxLength(100)
    nationalAnthem?: string

    @ApiPropertyOptional({ example: 'Japanese', maxLength: 100 })
    @MaxLength(100)
    officialLanguage?: string

    @ApiPropertyOptional({ example: 'Shinto,Buddhism', maxLength: 100 })
    @MaxLength(100)
    religions?: string

    @ApiProperty({ example: 'jp.png', maxLength: 10 })
    @MaxLength(10)
    flagUrl?: string

    @ApiPropertyOptional({ example: 'White with red circle', maxLength: 100 })
    @MaxLength(100)
    flagDescription?: string

    @ApiProperty({ example: 'Asia/Tokyo', maxLength: 100 })
    @MaxLength(100)
    timeZones?: string

    @ApiPropertyOptional({ example: 35.6895 })
    @IsLatitude()
    latitude?: number

    @ApiPropertyOptional({ example: 139.6917 })
    @IsLongitude()
    longitude?: number

    @ApiPropertyOptional({ example: 'UN,APEC', maxLength: 100 })
    @MaxLength(100)
    globalOrgs?: string

    @ApiPropertyOptional()
    isLandlocked?: boolean

    @ApiPropertyOptional()
    isIsland?: boolean

    @ApiPropertyOptional()
    hasDesert?: boolean

    @ApiPropertyOptional()
    hasRainforest?: boolean

    @ApiPropertyOptional({ example: 62 })
    rankArea?: number

    @ApiPropertyOptional({ example: 'CN,KR,RU', maxLength: 50 })
    @MaxLength(50)
    neighborCountries?: string

    @ApiPropertyOptional({ example: '1952-04-28' })
    @IsDateString()
    independenceDate?: string

    @ApiPropertyOptional({ example: 'Nippon', maxLength: 100 })
    @MaxLength(100)
    formerName?: string
}

export class GeoCountryUpdateDto extends IntersectionType(BaseUidDto, PartialType(GeoCountryCreateDto)) { }

export class GeoCountryDto extends IntersectionType(BaseCreateDto, GeoCountryCreateDto) {

    constructor(entity?: MetaGeoCountry) {
        super(entity);
        if (!entity) return;

        Object.assign(this, new BaseCreateDto(entity));

        //
        this.capital = entity.capital;
        this.codeA2 = entity.codeA2;
        this.codeA3 = entity.codeA3;
        this.continent = entity.continent;
        this.curCode = entity.curCode;
        this.curName = entity.curName;
        this.curSymbol = entity.curSymbol;
        this.dialCode = entity.dialCode;
        this.flagDescription = entity.flagDescription;
        this.flagUrl = entity.flagUrl;
        this.formerName = entity.formerName;
        this.globalOrgs = entity.globalOrgs;
        this.hasDesert = entity.hasDesert;
        this.hasRainforest = entity.hasRainforest;
        this.highestPoint = entity.highestPoint;
        this.independenceDate = entity.independenceDate;
        this.internetTld = entity.internetTld;
        this.isIsland = entity.isIsland;
        this.isLandlocked = entity.isLandlocked;
        this.largestCity = entity.largestCity;
        this.latitude = entity.latitude;
        this.longestRiver = entity.longestRiver;
        this.longitude = entity.longitude;
        this.name = entity.name;
        this.nationalBankAbbr = entity.nationalBankAbbr;
        this.nationalBankName = entity.nationalBankName;
        this.nationalAnimal = entity.nationalAnimal;
        this.nationalAnthem = entity.nationalAnthem;
        this.nationalBird = entity.nationalBird;
        this.nationalFlower = entity.nationalFlower;
        this.nationalSport = entity.nationalSport;
        this.neighborCountries = entity.neighborCountries;
        this.officialLanguage = entity.officialLanguage;
        this.olympicCode = entity.olympicCode;
        this.rankArea = entity.rankArea;
        this.religions = entity.religions;
        this.timeZones = entity.timeZones;
    }
}
