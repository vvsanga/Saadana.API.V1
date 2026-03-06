import { BeforeUpdate, Column } from "typeorm";
import { RequestContext } from "../../models/request-context.model";
import { DateTimeUtil } from "../../utils/datetime.util";
import { BaseCreateEntity } from "./base-create.entity";

export abstract class BaseUpdateEntity extends BaseCreateEntity {
  @Column({ type: 'int', nullable: true })
  updatedBy?: number;

  @Column({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @BeforeUpdate()
  handleUpdate() {
    this.updatedBy = RequestContext?.userId || 0;
    this.updatedAt = DateTimeUtil.nowUTC();
  }
}
