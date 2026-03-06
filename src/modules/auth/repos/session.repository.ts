import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C_AUTH } from '../constants/auth.const';
import { AuthSession } from '../entities/auth-session.entity';

@Injectable()
export class SessionRepository {
    constructor(
        @InjectRepository(AuthSession)
        private readonly sessionRepo: Repository<AuthSession>,
    ) { }

    async getOrCreate(userId: number) {
        const existing = await this.sessionRepo.findOne({
            where: { user: { id: userId } as any },
        });

        if (existing) return existing;

        return this.sessionRepo.save(
            this.sessionRepo.create({
                user: { id: userId } as any,
                maxActive: 5,
            }),
        );
    }

    async assertLoginAllowed(userId: number) {
        const session = await this.getOrCreate(userId);

        if (session.isSuspended) {
            throw new ForbiddenException('Account suspended');
        }

        if (session.lockoutUntil && session.lockoutUntil > new Date()) {
            throw new HttpException(
                'Account locked',
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }

        return session;
    }

    async recordFailedLogin(userId: number) {
        const session = await this.getOrCreate(userId);

        session.failedLogins++;
        session.lastFailedLoginAt = new Date();

        if (session.failedLogins >= C_AUTH.MAX_FAILS) {
            session.lockoutUntil = new Date(Date.now() + C_AUTH.LOCK_MINS);
            session.failedLogins = 0;
        }

        await this.sessionRepo.save(session);
    }

    async recordSuccessfulLogin(userId: number) {
        const session = await this.getOrCreate(userId);
        session.failedLogins = 0;
        session.lastSuccessLoginAt = new Date();
        return this.sessionRepo.save(session);
    }
}
