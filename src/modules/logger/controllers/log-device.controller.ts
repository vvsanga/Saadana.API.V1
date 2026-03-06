import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { LogDeviceCreateDto, LogDeviceDto, LogDeviceUpdateDto } from '../dtos/log-device.dto';
import { LogDevice } from '../entities/log-device.entity';
import { LogDeviceService } from '../services/log-device.service';

@InternalRoute()
@ApiTags('Logs Device')
@Controller('logs/device')
@ApiCrud(LogDeviceCreateDto, LogDeviceUpdateDto, LogDeviceDto)
export class LogDeviceController extends BaseCrudController<
  LogDevice,
  LogDeviceCreateDto,
  LogDeviceUpdateDto,
  LogDeviceDto> {
  constructor(protected readonly service: LogDeviceService) {
    super(service, LogDeviceDto);
  }
}
