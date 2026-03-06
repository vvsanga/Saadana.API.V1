import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { LogRequestCreateDto, LogRequestDto, LogRequestUpdateDto } from '../dtos/log-request.dto';
import { LogRequest } from '../entities/log-request.entity';
import { LogRequestService } from '../services/log-request.service';

@InternalRoute()
@ApiTags('Logs Request')
@Controller('logs/request')
@ApiCrud(LogRequestCreateDto, LogRequestUpdateDto, LogRequestDto)
export class LogRequestController extends BaseCrudController<LogRequest, LogRequestCreateDto, LogRequestUpdateDto, LogRequestDto> {
  constructor(protected readonly service: LogRequestService) {
    super(service, LogRequestDto);
  }
}
