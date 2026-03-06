import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { INTERNAL_ROUTE_KEY, PUBLIC_ROUTE_KEY, REFRESH_ROUTE_KEY } from "../../../core/decorators/auth.decorator";
import { RequestContext } from "../../../core/models/request-context.model";
import { C_AUTH } from "../../../modules/auth/constants/auth.const";
import { IJwtAccessPayload, IJwtRefreshPayload } from "../../../modules/auth/models/auth.model";
import { UserRepository } from "../../../modules/user/repositories/user.repository";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userRepo: UserRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        // const request = context.switchToHttp().getRequest();
        const appSecret = request.headers['x-app-secret'];

        // In production, move 'my-super-secret-ionic-key' to environment variables
        if (appSecret !== 'my-super-secret-ionic-key') {
            throw new UnauthorizedException('Request must originate from the official Ionic App');
        }

        // 1️⃣ Public routes bypass everything
        if (this.isPublicRoute(context)) {
            return true;
        }

        // 2️⃣ Authenticate
        const payload = await this.validateJwt(context, request);

        const user = await this.userRepo.get({ uid: payload.uid });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // 3️⃣ Attach user to request context
        RequestContext.set({ user });
        RequestContext.set({ userId: user.id });

        // 4️⃣ Internal-only route enforcement
        if (this.isInternalRoute(context) && !user.isInternal) {
            throw new ForbiddenException('Internal access only');
        }

        return true;
    }

    private isPublicRoute(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride<boolean>(
            PUBLIC_ROUTE_KEY,
            [context.getHandler(), context.getClass()],
        );
    }

    private isInternalRoute(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride<boolean>(
            INTERNAL_ROUTE_KEY,
            [context.getHandler(), context.getClass()],
        );
    }

    private async validateJwt(
        context: ExecutionContext,
        request: Request,
    ) {
        // Fix: Explicitly handle string | string[] | undefined
        const rawHeader = request.headers['authorization'];

        if (!rawHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        // Normalize to a single string (handles case where header is sent multiple times)
        const authHeader = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid Authorization header format');
        }

        const isRefresh = this.reflector.getAllAndOverride<boolean>(
            REFRESH_ROUTE_KEY,
            [context.getHandler(), context.getClass()],
        );

        try {
            const payload = isRefresh
                ? await this.jwtService.verifyAsync<IJwtRefreshPayload>(token, {
                    secret: C_AUTH.JWT.REFRESH.SECRET,
                })
                : await this.jwtService.verifyAsync<IJwtAccessPayload>(token, {
                    secret: C_AUTH.JWT.ACCESS.SECRET,
                });

            // Logical validation of token type
            if (isRefresh && payload.type !== 'refresh') {
                throw new UnauthorizedException('Expected refresh token');
            }

            if (!isRefresh && payload.type !== 'access') {
                throw new UnauthorizedException('Expected access token');
            }

            return payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
