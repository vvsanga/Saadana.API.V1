import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { BaseUidDto } from "../../../core/base/dtos/base-uid.dto";
import { BaseUpdateDto } from "../../../core/base/dtos/base-update.dto";
import { PlanRefDto } from "../../infra/dtos/plan.dto";
import { UserRefDto } from "../../../modules/user/dtos/user.dto";
import { ESubscriptionStatus } from "../constants/order.enum";
import { AppSubscription } from "../entities/app-subscription.entity";

class SubscriptionCore {
  @ApiProperty({ description: 'Subscription status', example: ESubscriptionStatus.ACTIVE })
  @IsNotEmpty()
  @Length(3)
  status!: string;

  @ApiProperty({ description: 'Subscription start date', example: '2025-08-01T00:00:00.000Z' })
  @IsNotEmpty()
  startDate!: Date;

  @ApiProperty({ description: 'Subscription end date', example: '2026-08-01T00:00:00.000Z' })
  @IsNotEmpty()
  endDate!: Date;
}

class SubscriptionCoreDto extends SubscriptionCore {
  constructor(entity?: AppSubscription) {
    super();
    if (!entity) return;

    this.status = entity.status;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
  }
}

export class SubscriptionRefDto extends IntersectionType(BaseUidDto, SubscriptionCoreDto) {
  constructor(entity: AppSubscription) {
    super();
    Object.assign(this, new BaseUidDto(entity));
    Object.assign(this, new SubscriptionCoreDto(entity));
  }
}

export class SubscriptionDto extends IntersectionType(BaseUpdateDto, SubscriptionRefDto) {
  @ApiProperty({ type: () => UserRefDto, nullable: true })
  user: UserRefDto | null;

  @ApiProperty({ type: () => PlanRefDto, nullable: true })
  plan: PlanRefDto | null;

  // @ApiProperty({ type: () => OrderRefDto, nullable: true })
  // order: OrderRefDto | null;

  // @ApiProperty({ type: () => PaymentRefDto, nullable: true })
  // payment: PaymentRefDto | null;

  constructor(entity: AppSubscription) {
    super(entity);
    Object.assign(this, new BaseUpdateDto(entity));
    Object.assign(this, new SubscriptionRefDto(entity));

    this.user = entity.user
      ? new UserRefDto(entity.user)
      : null;
    this.plan = entity.plan
      ? new PlanRefDto(entity.plan)
      : null;
    // this.order = entity.order
    //   ? new OrderRefDto(entity.order)
    //   : null;
    // this.payment = entity.payment
    //   ? new PaymentRefDto(entity.payment)
    //   : null;
  }
}

export class SubscriptionCreateDto extends PartialType(SubscriptionCore) {
  @ApiProperty({ description: 'User UID', example: 'f507a3a81f9e' })
  @Length(12, 12)
  userUid!: string;

  @ApiProperty({ description: 'Subscription plan UID', example: 'a91bc82d0e4f' })
  @Length(12, 12)
  planUid!: string;

  @ApiPropertyOptional({ description: 'Order UID', example: 'c812fa019b7d' })
  @Length(12, 12)
  orderUid?: string;

  @ApiPropertyOptional({ description: 'Payment UID', example: 'e712bc9810aa' })
  @Length(12, 12)
  paymentUid?: string;
}

export class SubscriptionUpdateDto extends IntersectionType(BaseUidDto, PartialType(SubscriptionCreateDto)) { }
