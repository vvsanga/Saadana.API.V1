import { BeforeInsert, BeforeUpdate, Check, Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { ERole } from "../../../core/decorators/roles.decorator";
import { Hash } from "../../../core/utils/crypto.util";
import { TestAttempt } from "../../../modules/exam/entities/test-attempt.entity";
import { LogRequest } from "../../../modules/logger/entities/log-request.entity";
import { AppOrder } from "../../../modules/orders/entities/app-order.entity";
import { AppPayment } from "../../../modules/orders/entities/app-payment.entity";
import { AppSubscription } from "../../../modules/orders/entities/app-subscription.entity";
import { AuthOtp } from "../../auth/entities/auth-otp.entity";
import { AuthProvider } from "../../auth/entities/auth-provider.entity";
import { AuthSession } from "../../auth/entities/auth-session.entity";
import { AuthToken } from "../../auth/entities/auth-token.entity";
import { AppUserProfile } from "./app-user-profile.entity";

@Entity('App_Users')
@Index(["email", "isActive"])
@Index(["phone", "isActive"])
@Check(`"email" IS NOT NULL OR "phone" IS NOT NULL`)
export class AppUser extends BaseUpdateEntity {

  @Column({ default: false })
  isInternal!: boolean;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email?: string;

  @Index()
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true, select: false })
  password?: string;

  @Column({ type: 'timestamptz', nullable: true })
  passwordChangedAt?: Date;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ default: false })
  isPhoneVerified!: boolean;

  @Column({ type: 'smallint', default: ERole.ADMIN })
  role!: ERole;

  /* Child relations (NO eager loading) */
  @OneToMany(() => AuthProvider, (provider) => provider.user, { cascade: ['insert'] })
  providers!: AuthProvider[];

  @OneToMany(() => AppUserProfile, profile => profile.user, { eager: false })
  profiles?: AppUserProfile[];

  @OneToMany(() => AppSubscription, sub => sub.user, { eager: false })
  subscriptions?: AppSubscription[];

  @OneToOne(() => AuthSession, sec => sec.user)
  session?: AuthSession;

  @OneToMany(() => AuthToken, ses => ses.user)
  tokens?: AuthToken[];

  @OneToMany(() => AuthOtp, ver => ver.user)
  otps?: AuthOtp[];

  @OneToMany(() => AppOrder, order => order.user)
  orders?: AppOrder[];

  @OneToMany(() => AppPayment, payment => payment.user)
  payments?: AppPayment[];

  @OneToMany(() => TestAttempt, test => test.user)
  tests?: TestAttempt[];

  @OneToMany(() => LogRequest, logReq => logReq.user)
  requests?: LogRequest[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = Hash(this.password);
    }
  }
}
