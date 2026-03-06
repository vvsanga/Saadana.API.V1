import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../../core/base/services/base-crud.service';
import { MetaGeoContinent } from '../entities/meta-geo-continent.entity';
import { MetaGeoCountry } from '../entities/meta-geo-country.entity';

@Injectable()
export class GeoContinentService extends BaseCrudService<MetaGeoContinent> {
  constructor(@InjectRepository(MetaGeoContinent) repo: Repository<MetaGeoContinent>) {
    super(repo);
  }
}

@Injectable()
export class GeoCountryService extends BaseCrudService<MetaGeoCountry> {
  constructor(@InjectRepository(MetaGeoCountry) repo: Repository<MetaGeoCountry>) {
    super(repo); // , selectRelations: ['continent'] 
  }
}
