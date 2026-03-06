import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { LogResponseCreateDto, LogResponseDto, LogResponseUpdateDto } from '../dtos/log-response.dto';
import { LogResponse } from '../entities/log-response.entity';
import { LogResponseService } from '../services/log-response.service';

@InternalRoute()
@ApiTags('Logs Response')
@Controller('logs/response')
@ApiCrud(LogResponseCreateDto, LogResponseUpdateDto, LogResponseDto)
export class LogResponseController extends BaseCrudController<LogResponse, LogResponseCreateDto, LogResponseUpdateDto, LogResponseDto> {
  constructor(protected readonly service: LogResponseService) {
    super(service, LogResponseDto);
  }
}
