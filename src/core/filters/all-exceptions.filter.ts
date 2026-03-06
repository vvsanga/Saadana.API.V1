import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../../modules/logger/services/logger.service';
import { ResponseDto } from '../base/dtos/response.dto';
import { RequestContext } from '../models/request-context.model';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) { }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {

    const response = host.switchToHttp().getResponse<Response>();

    const requestUid = RequestContext?.requestUid!;
    const requestId = RequestContext?.requestId!;

    const { status, message } = await this.logger.logException(requestUid, requestId, exception);

    const durationMs = RequestContext?.duration;
    await this.logger.logResponse(requestUid, requestId, message, status, durationMs);

    response.status(status).json(
      new ResponseDto({
        success: false,
        message,
        durationMs,
      }),
    );
  }
}
