import { Max, Min } from "class-validator";
import { Column, Entity, Index } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";

@Entity({ name: "App_Clients" })
export class AppClient extends BaseUpdateEntity {

  @Index()
  @Column({ type: 'varchar', length: 63, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  ipFrom!: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  ipTo?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  origins?: string;

  @Column({ name: 'rate_limit', type: 'smallint', default: 3 })
  @Min(1)
  @Max(5)
  rateLimit!: number;
}
