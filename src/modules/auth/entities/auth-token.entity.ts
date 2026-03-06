import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { HashAsync } from "../../../core/utils/crypto.util";
import { GetUid } from "../../../core/utils/uid.util";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { ETokenType } from "../constants/auth.enum";
import { C_TOKEN_EXP } from "../constants/token.const";

@Entity('Auth_Tokens')
@Index(['token'])
@Index(['type', 'token'])
@Index(['user', 'type', 'isRevoked'])
@Index(['expiresAt'])
@Index(['user', 'type', 'expiresAt'])
export class AuthToken extends BaseUpdateEntity {

  @ManyToOne(() => AppUser, (user) => user.tokens, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user?: AppUser;

  @Column({ type: 'char', length: 1 })
  type!: ETokenType;

  @Column({ type: 'varchar', length: 255 })
  token!: string;

  @Column({ default: false })
  isRevoked!: boolean;

  @Column({ type: 'int' })
  expiresSec!: number;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  tokenPlain!: string;

  @BeforeInsert()
  async generateToken() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    this.tokenPlain = String(GetUid(16));
    this.token = await HashAsync(this.tokenPlain);
    this.expiresSec = C_TOKEN_EXP.PWD_RESET_SEC;
    this.expiresAt = new Date(
      this.createdAt.getTime() + this.expiresSec * 1000,
    );
  }
}
