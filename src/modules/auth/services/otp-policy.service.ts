import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { EChannel, EOtpType } from "../constants/auth.enum";
import { AuthOtp } from "../entities/auth-otp.entity";

@Injectable()
export class OtpPolicyService {
    readonly WINDOW_MS = 5 * 60 * 1000;
    readonly MAX_WINDOW = 3;
    readonly DAILY_MAX = 10;
    readonly RESEND_COOLDOWN_MS = 30 * 1000;

    constructor(
        @InjectRepository(AuthOtp)
        private readonly otpRepo: Repository<AuthOtp>,
    ) { }

    async assertSendAllowed(userId: number, channel: EChannel, type: EOtpType) {
        const now = Date.now();

        const windowOtps = await this.otpRepo.find({
            where: {
                user: { id: userId },
                channel,
                type,
                createdAt: MoreThan(new Date(now - this.WINDOW_MS)),
            },
            order: { createdAt: 'DESC' },
        });

        const latest = windowOtps[0];
        if (latest) {
            const elapsed = now - latest.createdAt.getTime();
            if (elapsed < this.RESEND_COOLDOWN_MS) {
                throw new BadRequestException({
                    message: 'OTP already sent',
                    retryAfter: Math.ceil((this.RESEND_COOLDOWN_MS - elapsed) / 1000),
                });
            }
        }

        if (windowOtps.length >= this.MAX_WINDOW) {
            const retryAt =
                windowOtps[windowOtps.length - 1].createdAt.getTime() +
                this.WINDOW_MS;
            throw new BadRequestException({
                message: 'Too many OTP requests',
                retryAfter: Math.ceil((retryAt - now) / 1000),
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayCount = await this.otpRepo.count({
            where: {
                user: { id: userId },
                channel,
                type,
                createdAt: MoreThan(today),
            },
        });

        if (todayCount >= this.DAILY_MAX) {
            throw new BadRequestException('Daily OTP limit reached');
        }
    }
}
