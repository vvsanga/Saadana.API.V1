// src/core/services/db-file.logger.ts
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';

@Injectable()
export class DbFileLogger implements TypeOrmLogger {
  constructor(private readonly pino: PinoLogger) {}

  // Defensive helper to access the internal pino instance
  private get logger() {
    return this.pino?.logger;
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (this.logger) {
      this.logger.info({ type: 'SQL', query, parameters });
    } else {
      console.log(`[SQL]: ${query}`); // Fallback to console if pino isn't ready
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger?.error({ type: 'SQL_ERROR', error, query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger?.warn({ type: 'SQL_SLOW', duration: time, query, parameters });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger?.info({ type: 'SCHEMA', message });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger?.info({ type: 'MIGRATION', message });
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (level === 'warn') {
      this.logger?.warn(message);
    } else {
      this.logger?.info(message);
    }
  }
}

// export class DbFileLogger implements TypeOrmLogger {
//   constructor(private readonly pino: PinoLogger) {}

//   // We use this.pino.logger to access the raw pino instance 
//   // which is strictly bound to your file transport.
  
//   logQuery(query: string, parameters?: any[]) {
//     this.pino.logger.info({ type: 'SQL', query, parameters });
//   }

//   logQueryError(error: string, query: string, parameters?: any[]) {
//     this.pino.logger.error({ type: 'SQL_ERROR', error, query, parameters });
//   }

//   logQuerySlow(time: number, query: string, parameters?: any[]) {
//     this.pino.logger.warn({ type: 'SQL_SLOW', duration: time, query, parameters });
//   }

//   logSchemaBuild(message: string) {
//     this.pino.logger.info({ type: 'SCHEMA', message });
//   }

//   logMigration(message: string) {
//     this.pino.logger.info({ type: 'MIGRATION', message });
//   }

//   log(level: 'log' | 'info' | 'warn', message: any) {
//     if (level === 'warn') this.pino.logger.warn(message);
//     else this.pino.logger.info(message);
//   }
// }