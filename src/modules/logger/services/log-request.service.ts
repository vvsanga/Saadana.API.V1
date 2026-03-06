import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { LogRequest } from '../entities/log-request.entity';

@Injectable()
export class LogRequestService extends BaseCrudService<LogRequest> {
  constructor(@InjectRepository(LogRequest) repo: Repository<LogRequest>) {
    super(repo);
  }
}
