import { BeforeInsert, Column, Index, PrimaryGeneratedColumn, BaseEntity as TypeORMBaseEntity } from "typeorm";
import { RequestContext } from "../../models/request-context.model";
import { DateTimeUtil } from "../../utils/datetime.util";
import { GetUid } from "../../utils/uid.util";

export abstract class BaseCreateEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 12, unique: true })
  uid!: string;

  @Index()
  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'int', default: 0 })
  createdBy!: number;

  @Column({ type: 'timestamptz' })
  createdAt!: Date;

  @BeforeInsert()
  handleCreate() {
    if (!this.uid) { this.uid = GetUid(); }
    this.createdBy = RequestContext?.userId ?? 0;
    this.createdAt = DateTimeUtil.nowUTC();
  }
}

// export abstract class BaseCreateEntity extends TypeORMBaseEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ type: 'varchar', length: 12, unique: true })
//   uid!: string;

//   @Index()
//   @Column({ default: true })
//   isActive!: boolean;

//   @Column({ type: 'int', default: 0 })
//   createdBy!: number;

//   @Column({ type: 'timestamptz' })
//   createdAt!: Date;

//   @BeforeInsert()
//   setUID() {
//     this.uid = this.uid || GetUid();
//   }
// }
