import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { ERole } from '../../../core/decorators/roles.decorator';
import { AppUser } from '../entities/app-user.entity';

@Injectable()
export class UserService extends BaseCrudService<AppUser> {
  constructor(
    @InjectRepository(AppUser) repo: Repository<AppUser>) {
    super(repo, { enumFields: { role: ERole } });
  }

  async getByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async getByPhone(phone: string) {
    return this.repository.findOne({ where: { phone } });
  }
}
