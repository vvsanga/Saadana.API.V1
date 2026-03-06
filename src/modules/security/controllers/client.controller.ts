import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { ClientCreateDto, ClientDto, ClientUpdateDto } from '../dtos/client.dto';
import { AppClient } from '../entities/app-client.entity';
import { ClientService } from '../services/client.service';

@InternalRoute()
@ApiTags('App Clients')
@Controller('app/clients')
@ApiCrud(ClientCreateDto, ClientUpdateDto, ClientDto)
export class ClientController extends BaseCrudController<
  AppClient,
  ClientCreateDto,
  ClientUpdateDto,
  ClientDto
> {
  constructor(protected readonly service: ClientService) {
    super(service, ClientDto);
  }
}
