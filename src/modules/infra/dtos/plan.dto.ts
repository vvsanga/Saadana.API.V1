import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { BaseCreateDto } from '../../../core/base/dtos/base-create.dto';
import { BaseUidDto } from '../../../core/base/dtos/base-uid.dto';
import { SubscriptionRefDto } from '../../../modules/orders/dtos/subscription.dto';
import { EBillMode, EPlanType } from '../constants/app.enum';
import { AppPlan } from '../entities/app-plan.entity';
import { NodeRefDto } from './node.dto';

class PlanCore {
  @ApiProperty() type!: EPlanType;
  @ApiProperty() billMode!: EBillMode;
  @ApiProperty() currency!: string;
  @ApiProperty() actualPrice?: number;
  @ApiPropertyOptional() discountRate?: number;
  @ApiPropertyOptional() discountPrice?: number;
}

class PlanCoreDto extends PlanCore {
  constructor(entity?: AppPlan) {
    super();
    if (!entity) return;

    this.type = entity.type;
    this.billMode = entity.billMode;
    this.currency = entity.currency;
    this.actualPrice = entity.actualPrice;
    this.discountPrice = entity.discountPrice;
    this.discountRate = entity.discountRate;
  }
}

export class PlanRefDto extends IntersectionType(BaseUidDto, PlanCoreDto) {
  constructor(entity: AppPlan) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new PlanCoreDto(entity));
  }
}

export class PlanDto extends IntersectionType(BaseCreateDto, PlanRefDto) {

  @ApiProperty({ type: () => NodeRefDto })
  node?: NodeRefDto;

  @ApiProperty({ type: () => [SubscriptionRefDto] })
  subscriptions?: SubscriptionRefDto[];

  // @ApiProperty({ type: () => [OrderRefDto] })
  // orders?: OrderRefDto[] | null;

  constructor(entity: AppPlan) {
    super(entity);

    Object.assign(this, new BaseCreateDto(entity));
    Object.assign(this, new PlanRefDto(entity));

    this.node = entity.node
      ? new NodeRefDto(entity.node)
      : undefined;

    this.subscriptions = entity.subscriptions?.length
      ? entity.subscriptions?.map(x => new SubscriptionRefDto(x))
      : undefined;

    // this.orders = entity.orders?.length
    //   ? entity.orders?.map(x => new OrderRefDto(x))
    //   : null;
  }
}

export class PlanCreateDto extends PartialType(PlanCore) {
  @ApiProperty({ example: 'f507a3a81f9e' })
  @Length(12, 12)
  nodeUid!: string;
}

export class PlanUpdateDto extends IntersectionType(BaseUidDto, PartialType(PlanCreateDto)) { }
