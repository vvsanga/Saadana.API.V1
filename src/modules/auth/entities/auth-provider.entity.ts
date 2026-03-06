import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseCreateEntity } from "../../../core/base/entities/base-create.entity";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { EAuthProvider } from "../constants/auth.enum";

@Index(['provider', 'providerId'], { unique: true })
@Entity('Auth_Provider')
export class AuthProvider extends BaseCreateEntity {

  @Column({ type: 'char', length: 1 })
  provider!: EAuthProvider;

  @Column({ name: 'providerId', type: 'varchar', length: 100 })
  providerId!: string;

  @ManyToOne(() => AppUser, (user) => user.providers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: AppUser;
}
