import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../user/users.module";
import { AuthAccessController } from "./controllers/auth-access.controller";
import { AuthVerifyController } from "./controllers/auth-verify.controller";
import { AuthOtp } from "./entities/auth-otp.entity";
import { AuthProvider } from "./entities/auth-provider.entity";
import { AuthSession } from "./entities/auth-session.entity";
import { AuthToken } from "./entities/auth-token.entity";
import { OtpRepository } from "./repos/otp.repository";
import { SessionRepository } from "./repos/session.repository";
import { TokenRepository } from "./repos/token.repository";
import { AuthAccessService } from "./services/auth-access.service";
import { AuthProviderService } from "./services/auth-provider.service";
import { OtpPolicyService } from "./services/otp-policy.service";
import { OtpService } from "./services/otp.service";
import { TokenService } from "./services/token.service";
import { MediaModule } from "../media/media.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthProvider,
            AuthSession,
            AuthOtp,
            AuthToken,
        ]),
        UsersModule,
        MediaModule
    ],
    controllers: [
        AuthAccessController,
        AuthVerifyController
    ],
    providers: [
        OtpRepository,
        SessionRepository,
        TokenRepository,
        AuthAccessService,
        AuthProviderService,
        OtpPolicyService,
        OtpService,
        TokenService
    ],
    exports: [
    ]
})
export class AuthModule { }
