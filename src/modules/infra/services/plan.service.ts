import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { EBillMode, EPlanType } from '../constants/app.enum';
import { AppPlan } from '../entities/app-plan.entity';

@Injectable()
export class PlanService extends BaseCrudService<AppPlan> {
  constructor(@InjectRepository(AppPlan) repo: Repository<AppPlan>) {
    super(repo, { selectRelations: ['node'], enumFields: { type: EPlanType, billMode: EBillMode } });
  }
}
