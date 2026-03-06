import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';

export interface INormalizedException {
  status: number;
  message: string;
  name: string;
  source?: string;
  stack?: string;
}

@Injectable()
export class ExceptionParser {
  normalize(ex: unknown): INormalizedException {
    if (ex instanceof HttpException) {
      const res = ex.getResponse();
      return {
        status: ex.getStatus(),
        name: ex.constructor.name,
        message: typeof res === 'string' ? res : (res as any)?.message ?? 'Request failed',
        source: this.extractSource(ex.stack),
        stack: ex.stack,
      };
    }
    if (ex instanceof Error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        name: ex.name,
        message: ex.message,
        source: this.extractSource(ex.stack),
        stack: ex.stack,
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      name: 'UnknownError',
      message: 'Internal server error',
    };
  }

  private extractSource(stack?: string): string | undefined {
    if (!stack) return undefined;
    const frame = stack.split('\n').find(l => l.trim().startsWith('at ') && !l.includes('node_modules') && !l.includes('internal/'));
    if (!frame) return undefined;
    const match = frame.match(/\((.*):(\d+):(\d+)\)$/) || frame.match(/at (.*):(\d+):(\d+)/);
    return match ? `${path.basename(match[1])}:${match[2]}` : undefined;
  }
}