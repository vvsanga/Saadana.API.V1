import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { LogDevice } from '../entities/log-device.entity';

@Injectable()
export class LogDeviceService extends BaseCrudService<LogDevice> {
  constructor(@InjectRepository(LogDevice) repo: Repository<LogDevice>) { super(repo); }
}
