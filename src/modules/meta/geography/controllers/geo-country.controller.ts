import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../../core/decorators/api-crud.decorator';
import { PublicRoute } from '../../../../core/decorators/auth.decorator';
import { GeoCountryCreateDto, GeoCountryDto, GeoCountryUpdateDto } from '../dtos/geo-country.dto';
import { MetaGeoCountry } from '../entities/meta-geo-country.entity';
import { GeoCountryService } from '../services/meta-geo.service';

@PublicRoute()
@ApiTags('Meta Geo Countries')
@ApiCrud(GeoCountryCreateDto, GeoCountryUpdateDto, GeoCountryDto)
@Controller('meta/countries')
export class GeoCountryController extends BaseCrudController<
  MetaGeoCountry,
  GeoCountryCreateDto,
  GeoCountryUpdateDto,
  GeoCountryDto
> {
  constructor(protected readonly api: GeoCountryService) {
    super(api, GeoCountryDto);
  }
}
