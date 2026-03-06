import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { LogResponse } from '../entities/log-response.entity';

@Injectable()
export class LogResponseService extends BaseCrudService<LogResponse> {
  constructor(@InjectRepository(LogResponse) repo: Repository<LogResponse>) {
    super(repo);
  }
}
