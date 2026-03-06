import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DateTimeUtil } from '../utils/datetime.util';

@Injectable()
export class RequestDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req.body) {
      Object.assign(req.body, DateTimeUtil.toUTC(req.body));
    }

    if (req.query) {
      Object.assign(req.query, DateTimeUtil.toUTC(req.query));
    }

    if (req.params) {
      Object.assign(req.params, DateTimeUtil.toUTC(req.params));
    }

    return next.handle();
  }
}
