import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseReadOnlyController } from '../../../core/base/controllers/base-read-only.controller';
import { ApiReadonly } from '../../../core/decorators/api-readonly.decorator';
import { PublicRoute } from '../../../core/decorators/auth.decorator';
import { PlanDto } from '../dtos/plan.dto';
import { AppPlan } from '../entities/app-plan.entity';
import { PlanService } from '../services/plan.service';

@PublicRoute()
@ApiTags('App Plans')
@Controller('app/plans')
@ApiReadonly(PlanDto)
export class PlanController extends BaseReadOnlyController<
    AppPlan,
    PlanDto> {
    constructor(protected readonly api: PlanService) {
        super(api, PlanDto);
    }
}
