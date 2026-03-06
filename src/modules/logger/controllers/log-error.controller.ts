import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { InternalRoute } from '../../../core/decorators/auth.decorator';
import { LogErrorCreateDto, LogErrorDto, LogErrorUpdateDto } from '../dtos/log-error.dto';
import { LogError } from '../entities/log-error.entity';
import { LogErrorService } from '../services/log-error.service';

@InternalRoute()
@ApiTags('Logs Error')
@Controller('logs/error')
@ApiCrud(LogErrorCreateDto, LogErrorUpdateDto, LogErrorDto)
export class LogErrorController extends BaseCrudController<LogError, LogErrorCreateDto, LogErrorUpdateDto, LogErrorDto> {
  constructor(protected readonly service: LogErrorService) {
    super(service, LogErrorDto);
  }
}
