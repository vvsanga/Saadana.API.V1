import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogDevice } from '../entities/log-device.entity';
import { LogError } from '../entities/log-error.entity';
import { LogRequest } from '../entities/log-request.entity';
import { LogResponse } from '../entities/log-response.entity';

@Injectable()
export class LogRepository {
  constructor(
    @InjectRepository(LogRequest)
    private readonly requestRepo: Repository<LogRequest>,
    @InjectRepository(LogResponse)
    private readonly responseRepo: Repository<LogResponse>,
    @InjectRepository(LogError)
    private readonly errorRepo: Repository<LogError>,
    @InjectRepository(LogDevice)
    private readonly deviceRepo: Repository<LogDevice>,
  ) { }

  async insertRequest(data: Partial<LogRequest>) {
    return this.requestRepo.save(this.requestRepo.create(data));
  }

  async insertResponse(data: Partial<LogResponse>) {
    return this.responseRepo.save(this.responseRepo.create(data));
  }

  async insertError(data: Partial<LogError>) {
    return this.errorRepo.save(this.errorRepo.create(data));
  }

  async getOrCreateDevice(device: Partial<LogDevice>) {
    const existing = await this.deviceRepo.findOne({
      where: { ip: device.ip },
    });

    if (existing) return existing;
    return this.deviceRepo.save(this.deviceRepo.create(device));
  }
}
