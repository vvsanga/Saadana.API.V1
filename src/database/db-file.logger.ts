import { Logger as TypeOrmLogger } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

export class DbFileLogger implements TypeOrmLogger {
  constructor(private readonly pino: PinoLogger) {}

  // We use this.pino.logger to access the raw pino instance 
  // which is strictly bound to your file transport.
  
  logQuery(query: string, parameters?: any[]) {
    this.pino.logger.info({ type: 'SQL', query, parameters });
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.pino.logger.error({ type: 'SQL_ERROR', error, query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.pino.logger.warn({ type: 'SQL_SLOW', duration: time, query, parameters });
  }

  logSchemaBuild(message: string) {
    this.pino.logger.info({ type: 'SCHEMA', message });
  }

  logMigration(message: string) {
    this.pino.logger.info({ type: 'MIGRATION', message });
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'warn') this.pino.logger.warn(message);
    else this.pino.logger.info(message);
  }
}