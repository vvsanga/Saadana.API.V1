import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ELogType } from '../constants/log.enum';
import { LogRepository } from '../repositories/log.repository';
import { ExceptionParser } from './exception-parser';

@Injectable()
export class LoggerService {
  constructor(
    private readonly pino: PinoLogger,
    private readonly logRepo: LogRepository,
    private readonly exceptionParser: ExceptionParser,
  ) { }

  private formatLog(message: string, context: string, uid: string = 'SYSTEM', type: ELogType = ELogType.INF, meta?: unknown) {

    const timestamp = new Date().toISOString();

    let metaString = '';
    if (meta !== undefined) {
      try {
        metaString = JSON.stringify(meta);
      } catch {
        metaString = '[unserializable-meta]';
      }
    }

    return [
      timestamp,
      uid,
      String(type).toUpperCase(),
      context,
      message,
      metaString
    ].join('|');
  }

  log(message: string, context: string, uid: string = 'SYSTEM', type: ELogType = ELogType.INF, meta?: unknown) {
    const logLine = this.formatLog(message, context, uid, type, meta);
    this.pino.info(logLine);
  }

  console(message: any, context?: string) {
    if (process.env.NODE_ENV === 'production') return;
    const label = context ? `\x1b[33m[${context}]\x1b[0m` : '\x1b[36m[DEBUG]\x1b[0m';
    console.log(`${label}`, message);
  }

  async logRequest(uid: string, action: string, device: any, payload: any, userId?: number) {

    const logLine = this.formatLog(action, '', uid, ELogType.REQ, { ip: device.ip, userId, payload });

    this.pino.info(logLine);

    const dev = await this.logRepo.getOrCreateDevice(device);
    return await this.logRepo.insertRequest({
      uid, action, payload,
      device: { id: dev.id } as any,
      user: userId ? ({ id: userId } as any) : null,
    });
  }

  async logResponse(reqUid: string, reqId: any, message: string, status: number, duration: number) {
    const logLine = this.formatLog(message, '', reqUid, ELogType.RES, { status, duration: `${duration}ms` });
    this.pino.info(logLine);

    if (!reqId) return;
    return await this.logRepo.insertResponse({
      request: { id: reqId } as any,
      status, message, durationMs: duration,
    });
  }

  async logException(uid: string, rid: any, exception: unknown) {
    const normalized = this.exceptionParser.normalize(exception);

    const logLine = this.formatLog(normalized.message, '', uid, ELogType.ERR, {
      source: normalized.source,
      stack: normalized.stack
    });
    this.pino.error(logLine);

    if (rid) {
      await this.logRepo.insertError({
        request: { id: rid } as any,
        status: normalized.status,
        name: normalized.name,
        message: normalized.message,
        source: normalized.source,
      });
    }
    return normalized;
  }
}
