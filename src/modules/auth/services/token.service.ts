import { BadRequestException, Injectable } from "@nestjs/common";
import { CompareHashAsync } from "../../../core/utils/crypto.util";
import { ETokenType } from "../constants/auth.enum";
import { getTokenPolicy } from "../constants/token.const";
import { TokenRepository } from "../repos/token.repository";

@Injectable()
export class TokenService {
    constructor(
        private readonly tokens: TokenRepository,
    ) { }

    async issue(userId: number, type: ETokenType) {
        const policy = getTokenPolicy(type);

        if (policy.revokeOnIssue) {
            await this.tokens.revokeByUser(userId, type);
        }

        const issuedAt = new Date();

        const token = this.tokens.create({
            user: { id: userId } as any,
            type,
            expiresSec: policy.expiresSec,
            expiresAt: new Date(issuedAt.getTime() + policy.expiresSec * 1000),
            createdAt: issuedAt,
        });

        const saved = await this.tokens.save(token);

        await this.enforceLimit(userId, type, policy.maxActive);

        return saved;
    }

    async validate(type: ETokenType, plain: string) {
        const policy = getTokenPolicy(type);

        const token = await this.tokens.findLatestActive(type);

        if (
            !token?.user ||
            !(await CompareHashAsync(plain, token.token))
        ) {
            throw new BadRequestException('Invalid or expired token');
        }

        if (policy.singleUse) {
            token.isRevoked = true;
            await this.tokens.save(token);
        }

        return token.user;
    }

    async enforceLimit(userId: number, type: ETokenType, max: number) {
        if (max <= 0) return;

        const active = await this.tokens.findActiveByUser(userId, type);
        const excess = active.length - max;

        if (excess > 0) {
            await this.tokens.revokeMany(active.slice(0, excess));
        }
    }
}
