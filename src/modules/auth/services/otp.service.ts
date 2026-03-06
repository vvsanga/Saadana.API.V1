import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppUser } from '../../../modules/user/entities/app-user.entity';
import { UserRepository } from '../../../modules/user/repositories/user.repository';
import { EChannel, EOtpType } from '../constants/auth.enum';
import { IIssueOtp, IValidateOtp } from '../models/otp.model';
import { OtpRepository } from '../repos/otp.repository';
import { OtpPolicyService } from './otp-policy.service';

@Injectable()
export class OtpService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly otpRepo: OtpRepository,
        private readonly otpPolicySvc: OtpPolicyService
    ) { }

    async issue(model: IIssueOtp) {

        const channel = model.channel === 'email' ? EChannel.EMAIL : EChannel.PHONE;
        const type = model.type === 'login' ? EOtpType.LOGIN : EOtpType.VERIFY;
        let user = await this.userRepo.getByChannel(channel, model.identifier);

        if (user) {
            await this.otpPolicySvc.assertSendAllowed(user.id, channel, type);
        }
        else {
            const data = channel === EChannel.EMAIL ? { email: model.identifier } : { phone: model.identifier };
            user = await this.userRepo.create(data);
        }

        if (type === EOtpType.VERIFY) {
            this.assertNotVerified(user, channel);
        }

        const otp = await this.otpRepo.create(user.id, channel, type);

        return { otp: otp.otpPlain, expiresAt: otp.expiresAt, expiresSec: otp.expiresSec, user, channel };
    }

    async validate(model: IValidateOtp) {

        const channel = model.channel === 'email' ? EChannel.EMAIL : EChannel.PHONE;
        const type = model.type === 'login' ? EOtpType.LOGIN : EOtpType.VERIFY;
        const user = await this.userRepo.getByChannel(channel, model.identifier);

        if (!user) throw new NotFoundException(`User not found with ${model.identifier}`)

        if (type === EOtpType.VERIFY) {
            this.assertNotVerified(user, channel);
        }

        return await this.otpRepo.verify(user.id, channel, type, model.otp);
    }

    private assertNotVerified(user: AppUser, channel: EChannel) {
        if (channel === EChannel.EMAIL && user.isEmailVerified) throw new BadRequestException("Email already verified");
        else if (channel === EChannel.PHONE && user.isPhoneVerified) throw new BadRequestException("Phone already verified");
    }
}
