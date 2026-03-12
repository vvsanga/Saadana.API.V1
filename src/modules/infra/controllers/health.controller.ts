import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { PublicRoute } from '../../../core/decorators/auth.decorator';
import * as fs from 'fs';

@PublicRoute()
@ApiTags('Api Health')
@Controller('api/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 3000 }),
    ]);
  }

  @Get('status')
  live() {
    return { status: 'ok' };
  }

  // @Get()
  // @HealthCheck()
  // check() {
  //   return this.health.check([
  //     // Check if the seed directory exists and is readable
  //     () => ({
  //       seed_folder: {
  //         status: fs.existsSync('/app/seed') ? 'up' : 'down',
  //         fileCount: fs.existsSync('/app/seed') ? fs.readdirSync('/app/seed').length : 0,
  //       },
  //     }),
  //     // Check if the disk has enough space (e.g., more than 5% free)
  //     () => this.disk.checkStorage('storage', { thresholdPercent: 0.95, path: '/' }),
  //   ]);
  // }
}