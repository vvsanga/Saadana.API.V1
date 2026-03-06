import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUpdateEntity } from "../../../core/base/entities/base-update.entity";
import { Hash } from "../../../core/utils/crypto.util";
import { AppUser } from "../../../modules/user/entities/app-user.entity";
import { EChannel, EOtpType } from "../constants/auth.enum";
import { C_OTP_EXP } from "../constants/otp.const";
import { GetOtp } from "../utils/otp.util";

@Entity('Auth_Otps')
@Index(['user', 'channel', 'type', 'createdAt'])
@Index(['user', 'channel', 'type', 'expiresAt'])
export class AuthOtp extends BaseUpdateEntity {
    @ManyToOne(() => AppUser, user => user.otps, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId' })
    user!: AppUser;

    @Column({ type: 'char', length: 1 })
    channel!: EChannel;

    @Column({ type: 'char', length: 1 })
    type!: EOtpType;

    @Column({ type: 'varchar', length: 100 })
    otp!: string;

    @Column({ default: false })
    isRevoked!: boolean;

    @Column({ type: 'int' })
    expiresSec!: number;

    @Column({ type: 'timestamptz' })
    expiresAt!: Date;

    otpPlain!: string;

    @BeforeInsert()
    async generateOtp() {
        this.otpPlain = String(GetOtp());
        this.otp = await Hash(this.otpPlain);
        this.expiresSec = this.channel === EChannel.PHONE ? C_OTP_EXP.PHONE_VERIFY_SEC : C_OTP_EXP.EMAIL_VERIFY_SEC;
        this.expiresAt = new Date(Date.now() + this.expiresSec * 1000);
    }
}
