import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseUpdateEntity } from '../../../core/base/entities/base-update.entity';
import { Test } from '../../../modules/exam/entities/test.entity';
import { EAcademicGrade } from '../constants/user.enum';
import { AppUser } from './app-user.entity';

@Entity('App_User_Profiles')
export class AppUserProfile extends BaseUpdateEntity {

  @ManyToOne(() => AppUser, (user) => user.profiles, {
    onDelete: 'SET NULL',
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: AppUser;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'smallint', nullable: false })
  grade!: EAcademicGrade;

  @Column({ type: 'text', array: true, nullable: true })
  topics?: string[];

  /* Relations */

  @OneToMany(() => Test, (test) => test.profile, { eager: false })
  tests!: Test[];
}
