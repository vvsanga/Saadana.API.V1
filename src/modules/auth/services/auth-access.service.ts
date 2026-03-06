import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ERole } from '../../../core/decorators/roles.decorator';
import { RequestContext } from '../../../core/models/request-context.model';
import { CompareHash } from '../../../core/utils/crypto.util';
import { EnumUtil } from '../../../core/utils/enum.util';
import { GetUid } from '../../../core/utils/uid.util';
import { C_MEDIA } from '../../../modules/media/constants/media.const';
import { C_MSG91 } from '../../../modules/media/constants/msg91.const';
import { IEmail, IMsg91EmailTo } from '../../../modules/media/models/email.model';
import { ISms } from '../../../modules/media/models/sms.model';
import { IEmailService } from '../../../modules/media/services/msg91-email.service';
import { ISmsService } from '../../../modules/media/services/msg91-sms.service';
import { UserDto } from '../../../modules/user/dtos/user.dto';
import { AppUser } from '../../../modules/user/entities/app-user.entity';
import { UserRepository } from '../../../modules/user/repositories/user.repository';
import { C_AUTH } from '../constants/auth.const';
import { EAuthProvider, EChannel, EOtpType, ETokenType } from '../constants/auth.enum';
import { LoginOAuthRequestDto, LoginOtpIssueRequestDto, LoginOtpValidateRequestDto, LoginPasswordRequestDto, RegisterRequestDto } from '../dtos/auth-access.dto';
import { IJwtAccessPayload, IJwtPayload, IJwtRefreshPayload, IJwtToken } from '../models/auth.model';
import { SessionRepository } from '../repos/session.repository';
import { TokenRepository } from '../repos/token.repository';
import { AuthProviderService } from './auth-provider.service';
import { OtpService } from './otp.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthAccessService {
    constructor(
        private readonly jwt: JwtService,
        private readonly userRepo: UserRepository,
        private readonly tokenRepo: TokenRepository,
        private readonly tokenSvc: TokenService,
        private readonly sessionRepo: SessionRepository,
        private readonly providerSvc: AuthProviderService,
        private readonly otpSvc: OtpService,
        private readonly emailSvc: IEmailService,
        private readonly smsSvc: ISmsService
    ) { }

    async register(model: RegisterRequestDto) {

        const user = await this.userRepo.getByChannel(EChannel.EMAIL, model.identifier);

        if (user) throw new ConflictException('Email already registered');

        await this.userRepo.create(
            { email: model.identifier },
            { password: model.password },
        );

        return this.loginWithPassword(model);
    }

    async loginWithPassword(model: LoginPasswordRequestDto) {

        const channel = model.channel === 'email' ? EChannel.EMAIL : EChannel.PHONE;
        const type = EOtpType.LOGIN;
        let user = await this.userRepo.getByChannel(channel, model.identifier, true);

        // const res = await this.userRepo.getByChannel(model.identifier, true);

        if (!user) throw new NotFoundException(`User not found with ${model.identifier}`)

        if (!user?.password || !CompareHash(model.password, user.password)) {
            if (user?.id) await this.sessionRepo.recordFailedLogin(user.id);
            throw new BadRequestException('Invalid credentials');
        }

        return this.loginFlow(user);
    }

    async loginIssueOtp(model: LoginOtpIssueRequestDto) {
        const { otp, expiresAt, expiresSec, channel, user } = await this.otpSvc.issue({ ...model, type: 'login' });
        const otpExpMins = expiresSec / 60;
        if (channel === EChannel.EMAIL) {
            const emailTo: IMsg91EmailTo = { name: 'vvsanga', email: model.identifier }
            const email: IEmail = {
                subject: C_MEDIA.SUB.VERIFY_OTP,
                templateId: C_MSG91.EMAIL.OTP_TMPL_ID,
                to: [emailTo],
                otp,
                otpExpMins
            }
            return await this.emailSvc.sendEmail(email);
        }
        else {
            const sms: ISms = {
                otp,
                otpExpMins,
                phone: model.identifier,
                templateId: C_MSG91.SMS.OTP_TMPL_ID,
            };
            return await this.smsSvc.sendOtp(sms);
        }
    }

    async loginWithOtp(model: LoginOtpValidateRequestDto) {

        const channel = model.channel === 'email' ? EChannel.EMAIL : EChannel.PHONE;
        // const type = EOtpType.LOGIN;
        const user = await this.userRepo.getByChannel(channel, model.identifier);

        if (!user) throw new NotFoundException(`User not found with ${model.identifier}`);

        const valid = await this.otpSvc.validate({
            otp: model.otp, identifier: model.identifier, type: 'login', channel: model.channel
        });

        if (!valid) {
            await this.sessionRepo.recordFailedLogin(user?.id);
            throw new BadRequestException();
        }

        const profile = channel === EChannel.EMAIL ? { emailVerified: true } : { phoneVerified: true }
        await this.userRepo.update(user, profile)

        return this.loginFlow(user);
    }

    async loginOAuth(model: LoginOAuthRequestDto, provider: string) {
        if (!provider || provider !== model.provider)
            throw new BadRequestException('Invalid provider');

        const providerEnum = EnumUtil.getValue(EAuthProvider, provider);
        const profile = await this.resolveOAuthProfile(
            providerEnum,
            model.token,
        );

        let user = await this.userRepo.get({
            email: profile.email,
            provider: profile.provider,
            providerId: profile.providerId,
        });

        user = user
            ? await this.userRepo.update(user, profile)
            : await this.userRepo.create(profile);

        return this.loginFlow(user);
    }

    async refresh() {
        const user = RequestContext?.user;
        if (!(user && user.id)) throw new UnauthorizedException();

        const token = await this.tokenRepo.findActiveByUser(user.id, ETokenType.REFRESH);

        // (userId, {
        //     user: true,
        //     providers: true,
        //     profiles: true,
        //     subscriptions: true,
        // });

        if (!token) throw new UnauthorizedException();

        return this.loginFlow(user);
    }

    async logout() {
        const userId = RequestContext?.userId;
        if (!userId) throw new UnauthorizedException();

        await this.tokenRepo.revokeByUser(userId, ETokenType.REFRESH);
        return true;
    }

    async logoutAll() {
        const userId = RequestContext?.userId;
        if (!userId) throw new UnauthorizedException();

        await this.tokenRepo.revokeByUser(userId);
        return true;
    }

    private async loginFlow(user: AppUser) {
        const type = ETokenType.REFRESH;
        const session = await this.sessionRepo.assertLoginAllowed(user.id);
        await this.sessionRepo.recordSuccessfulLogin(user.id);
        await this.tokenSvc.enforceLimit(user.id, type, session.maxActive);

        const tokens = await this.issueTokens(user);

        return {
            ...tokens,
            user: new UserDto(user),
        };
    }

    private async resolveOAuthProfile(
        provider: EAuthProvider,
        token: string,
    ) {
        switch (provider) {
            case EAuthProvider.GOOGLE:
                return this.providerSvc.verifyGoogleToken(token);
            case EAuthProvider.FACEBOOK:
                return this.providerSvc.verifyFacebookToken(token);
            case EAuthProvider.APPLE:
                return this.providerSvc.verifyAppleToken(token);
            default:
                throw new UnauthorizedException();
        }
    }

    private async issueTokens(user: AppUser) {
        const role = EnumUtil.getKey(ERole, user.role);
        if (!role) throw new ForbiddenException('Access denied');

        const baseDate = user.passwordChangedAt ?? user.createdAt;
        const tokenVersion = Math.floor(
            new Date(baseDate).getTime() / 1000,
        );

        const sid = GetUid();
        const deviceId = GetUid();

        const basePayload: IJwtPayload = {
            sid,
            sub: String(user.id),
            uid: user.uid,
            provider: user.providers[0].provider,
            aud: C_AUTH.JWT.AUDIENCE,
            iss: C_AUTH.JWT.ISSUER,
        };

        const accessToken = await this.signToken<IJwtAccessPayload>(
            {
                ...basePayload,
                type: 'access',
                email: user.email!,
                role,
                isInternal: !!user.isInternal,
                tokenVersion,
            },
            C_AUTH.JWT.ACCESS.SECRET,
            C_AUTH.JWT.ACCESS.TTL_SEC,
        );

        const refreshToken = await this.signToken<IJwtRefreshPayload>(
            {
                ...basePayload,
                type: 'refresh',
                deviceId,
            },
            C_AUTH.JWT.REFRESH.SECRET,
            C_AUTH.JWT.REFRESH.TTL_SEC,
        );

        await this.tokenRepo.create({
            uid: sid,
            user: { id: user.id } as any,
            token: refreshToken.token,
            expiresSec: refreshToken.expiresSec,
            expiresAt: refreshToken.expiresAt,
            createdAt: refreshToken.issuedAt,
        });

        return { accessToken, refreshToken };
    }

    private async signToken<T extends IJwtPayload>(
        payload: T,
        secret: string,
        ttl: number,
    ): Promise<IJwtToken> {
        const token = await this.jwt.signAsync(payload, {
            secret: secret.trim(),
            expiresIn: ttl,
        });

        const issuedAt = new Date();

        return {
            token,
            expiresSec: ttl,
            issuedAt,
            expiresAt: new Date(issuedAt.getTime() + ttl * 1000),
        };
    }
}
