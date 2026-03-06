import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { LogError } from '../entities/log-error.entity';

@Injectable()
export class LogErrorService extends BaseCrudService<LogError> {
  constructor(@InjectRepository(LogError) repo: Repository<LogError>) {
    super(repo);
  }
}
