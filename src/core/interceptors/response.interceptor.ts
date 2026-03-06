import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Optional } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, mergeMap } from "rxjs";
import { ResponseDto } from "../../core/base/dtos/response.dto";
import { ELogType } from "../../modules/logger/constants/log.enum";
import { LoggerService } from "../../modules/logger/services/logger.service";
import { UserRepository } from "../../modules/user/repositories/user.repository";
import { SKIP_RESP_WRAP_KEY, SUCCESS_RESP_MSG_KEY } from "../decorators/response.decorator";
import { RequestContext } from "../models/request-context.model";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: LoggerService,
    @Optional() private readonly userRepo: UserRepository,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const handler = context.getHandler();

    // Check metadata for wrapping and custom messages
    const skipWrap = this.reflector.get<boolean>(SKIP_RESP_WRAP_KEY, handler);
    const message = this.reflector.get<string>(SUCCESS_RESP_MSG_KEY, handler) ?? 'Success';

    return next.handle().pipe(
      mergeMap(async (data) => {
        // 1. Extract context metadata for logging
        const duration = RequestContext.duration;
        const reqUid = RequestContext?.requestUid!;
        const reqId = RequestContext?.requestId!;

        // 2. Log the response via LogsModule
        await this.logger.logResponse(reqUid, reqId, message, res.statusCode, duration);

        // 3. Construct the Payload
        const payload = skipWrap
          ? data
          : new ResponseDto({
            success: true,
            message,
            durationMs: duration,
            data,
          });

        // 4. Handle Audit Mapping (The futuristic part)
        // We only attempt this if UserService was successfully injected
        if (this.userRepo) {
          const audited: any[] = [];
          // Drill into the data (either raw or wrapped) to find createdBy/updatedBy
          this.collectAuditedEntities(skipWrap ? data : payload.data, audited);

          if (audited.length > 0) {
            try {
              await this.userRepo.resolveAuditUsers(audited);
            } catch (error: any) {
              // Log error but don't crash the response if audit resolution fails
              this.logger.log(error.message, 'ResponseInterceptor', reqUid, ELogType.ERR, { stack: error.stack });
            }
          }
        }

        return payload;
      }),
    );
  }

  /**
   * Recursively finds objects containing 'createdBy' or 'updatedBy' keys
   * to prepare them for user object hydration.
   */
  private collectAuditedEntities(obj: any, out: any[]) {
    if (!obj || typeof obj !== 'object') return;

    // Check if current object is an "auditable" entity
    if ('createdBy' in obj || 'updatedBy' in obj) {
      out.push(obj);
    }

    // Recursively check nested objects or arrays
    for (const v of Object.values(obj)) {
      if (Array.isArray(v)) {
        v.forEach((item) => this.collectAuditedEntities(item, out));
      } else if (v && typeof v === 'object') {
        this.collectAuditedEntities(v, out);
      }
    }
  }
}

// @Injectable()
// export class ResponseInterceptor implements NestInterceptor {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly logger: LoggerService,
//     private readonly userSvc: UserService,
//   ) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const res = context.switchToHttp().getResponse();
//     const handler = context.getHandler();
//     const skipWrap = this.reflector.get<boolean>(SKIP_RESP_WRAP_KEY, handler);
//     const message = this.reflector.get<string>(SUCCESS_RESP_MSG_KEY, handler) ?? 'Success';

//     return next.handle().pipe(
//       mergeMap(async (data) => {
//         const duration = RequestContext.duration;
//         const uid = RequestContext.requestUid;
//         const rid = RequestContext.requestId;

//         await this.logger.logResponse(uid, rid, message, res.statusCode, duration);

//         const payload = skipWrap ? data : new ResponseDto({
//           success: true,
//           message,
//           durationMs: duration,
//           data,
//         });

//         const audited: any[] = [];
//         this.collectAuditedEntities(skipWrap ? data : payload.data, audited);
//         if (audited.length) await this.userSvc.resolveAuditUsers(audited);

//         return payload;
//       }),
//     );
//   }

//   private collectAuditedEntities(obj: any, out: any[]) {
//     if (!obj || typeof obj !== 'object') return;
//     if ('createdBy' in obj || 'updatedBy' in obj) out.push(obj);
//     for (const v of Object.values(obj)) {
//       if (Array.isArray(v)) v.forEach(i => this.collectAuditedEntities(i, out));
//       else if (v && typeof v === 'object') this.collectAuditedEntities(v, out);
//     }
//   }
// }

