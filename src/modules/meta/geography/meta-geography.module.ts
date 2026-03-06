import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoCountryController } from './controllers/geo-country.controller';
import { MetaGeoContinent } from './entities/meta-geo-continent.entity';
import { MetaGeoCountry } from './entities/meta-geo-country.entity';
import { MetaGeoDesert } from './entities/meta-geo-desert.entity';
import { MetaGeoRiver } from './entities/meta-geo-rivers.entity';
import { MetaGeoWaterBody } from './entities/meta-geo-water-bodies.entity';
import { MetaGlobalOrg } from './entities/meta-global-org.entity';
import { GeoContinentService, GeoCountryService } from './services/meta-geo.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MetaGeoContinent,
            MetaGeoCountry,
            MetaGeoDesert,
            MetaGeoWaterBody,
            MetaGeoRiver,
            MetaGlobalOrg,
        ])
    ],
    providers: [
        GeoContinentService,
        GeoCountryService
    ],
    controllers: [
        GeoCountryController
    ]
})
export class MetaGeographyModule { }
