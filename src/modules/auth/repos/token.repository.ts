import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { ETokenType } from "../constants/auth.enum";
import { AuthToken } from "../entities/auth-token.entity";

@Injectable()
export class TokenRepository {
    constructor(
        @InjectRepository(AuthToken)
        private readonly repo: Repository<AuthToken>,
    ) { }

    findActiveByUser(userId: number, type?: ETokenType) {
        return this.repo.find({
            where: {
                user: { id: userId },
                ...(type && { type }),
                isRevoked: false,
            },
            order: { createdAt: 'ASC' },
        });
    }

    findLatestActive(type: ETokenType) {
        return this.repo.findOne({
            where: {
                type,
                isRevoked: false,
                expiresAt: MoreThan(new Date()),
            },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }

    revokeByUser(userId: number, type?: ETokenType) {
        return this.repo.update(
            {
                user: { id: userId },
                ...(type && { type }),
                isRevoked: false,
            },
            { isRevoked: true },
        );
    }

    revokeMany(tokens: AuthToken[]) {
        return this.repo.save(
            tokens.map(t => ({ ...t, isRevoked: true })),
        );
    }

    save(token: AuthToken) {
        return this.repo.save(token);
    }

    create(data: Partial<AuthToken>) {
        return this.repo.create(data);
    }
}
