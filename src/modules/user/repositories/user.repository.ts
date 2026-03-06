import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync } from 'fs';
import { join } from 'path';
import { ERole } from "../../../core/decorators/roles.decorator";
import { DownloadFile } from "../../../core/utils/file.util";
import { EAuthProvider, EChannel } from "../../../modules/auth/constants/auth.enum";
import { IOAuthProfile } from "../../../modules/auth/models/auth.model";
import { In, Repository } from "typeorm";
import { GetUid } from "../../../core/utils/uid.util";
import { AuthProvider } from "../../auth/entities/auth-provider.entity";
import { AppUser } from "../entities/app-user.entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(AppUser)
        private readonly userRepo: Repository<AppUser>
    ) { }

    private readonly targetFolder = 'profiles';

    private displayName(user: AppUser): string {
        return (
            [user.firstName, user.lastName].filter(Boolean).join(' ') ||
            user.email?.split('@')[0] ||
            'Unknown'
        );
    }

    private async resolveAvatar(
        picture?: string,
        uid?: string,
        currentAvatar?: string,
    ): Promise<string | undefined> {
        if (!picture || !uid) return currentAvatar;

        const fileName = `${uid}.png`;
        const filePath = join(this.targetFolder, fileName);

        if (existsSync(filePath)) {
            return currentAvatar ?? fileName;
        }

        return DownloadFile(picture, this.targetFolder, uid, 'png');
    }

    async resolveAuditUsers(entities: any[]): Promise<void> {
        if (!entities.length) return;

        const userIds = [
            ...new Set(
                entities.flatMap(e =>
                    [e.createdBy, e.updatedBy].filter(
                        v => Number.isInteger(v) && v > 0,
                    ),
                ),
            ),
        ];

        if (!userIds.length) return;

        const users = await this.userRepo.findBy({ id: In(userIds) });
        const map = new Map(users.map(u => [u.id, u]));

        for (const e of entities) {
            e.createdBy =
                e.createdBy === 0
                    ? 'system'
                    : map.get(e.createdBy)
                        ? this.displayName(map.get(e.createdBy)!)
                        : e.createdBy;

            e.updatedBy =
                e.updatedBy === 0
                    ? 'system'
                    : map.get(e.updatedBy)
                        ? this.displayName(map.get(e.updatedBy)!)
                        : e.updatedBy;
        }
    }

    async getByChannel(channel: EChannel, identifier: string, includePassword?: boolean) {
        // const eChannel = GetChannel(identifier);
        const where = channel === EChannel.EMAIL ? { email: identifier } : { phone: identifier };
        const user = await this.get({ ...where, provider: EAuthProvider.INTERNAL, includePassword });
        // if(user) return { user, eChannel }
        return user;
        // if (!user) throw new NotFoundException(`User not found with ${contact}`);
        // return { user, channel };
    }

    async get(params: {
        id?: number;
        uid?: string;
        email?: string;
        phone?: string;
        provider?: EAuthProvider;
        providerId?: string;
        includePassword?: boolean;
    }): Promise<AppUser | null> {
        const {
            id,
            uid,
            email,
            phone,
            provider,
            providerId,
            includePassword,
        } = params;

        if (
            !id &&
            !uid &&
            !email &&
            !phone &&
            !(provider && providerId)
        ) {
            return null;
        }

        const qb = this.userRepo
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.providers', 'provider')
            .leftJoinAndSelect('user.profiles', 'profile')
            .leftJoinAndSelect('user.subscriptions', 'subscription');

        if (includePassword) {
            qb.addSelect('user.password');
        }

        if (id) qb.where('user.id = :id', { id });
        else if (uid) qb.where('user.uid = :uid', { uid });
        else if (email) qb.where('user.email = :email', { email });
        else if (phone) qb.where('user.phone = :phone', { phone });

        if (provider && providerId) {
            qb.andWhere(
                'provider.provider = :provider AND provider.providerId = :providerId',
                { provider, providerId },
            );
        }

        return qb.getOne();
    }

    async create(
        profile: IOAuthProfile,
        options?: { password?: string; role?: ERole },
    ): Promise<AppUser> {
        return this.userRepo.manager.transaction(async (em) => {
            const uid = GetUid();

            const avatar = await this.resolveAvatar(profile.picture, uid);

            const user = em.create(AppUser, {
                uid,
                email: profile.email,
                phone: profile.phone,
                password: options?.password,
                firstName: profile.givenName,
                lastName: profile.familyName,
                avatar,
                isActive: true,
                isEmailVerified: profile.emailVerified ?? false,
                role: options?.role ?? ERole.ADMIN,
            });

            const savedUser = await em.save(AppUser, user);

            const provider = em.create(AuthProvider, {
                provider: profile.provider ?? EAuthProvider.INTERNAL,
                providerId: profile.providerId ?? uid,
                user: savedUser,
            });

            await em.save(AuthProvider, provider);

            savedUser.providers = [provider];

            return savedUser;
        });
    }

    async update(user: AppUser, profile: IOAuthProfile): Promise<AppUser> {
        user.firstName ??= profile.givenName;
        user.lastName ??= profile.familyName;
        user.isEmailVerified ||= !!profile.emailVerified;
        user.isPhoneVerified ||= !!profile.phoneVerified;
        user.isActive = true;
        user.role ??= ERole.ADMIN;

        user.avatar = await this.resolveAvatar(
            profile.picture,
            user.uid,
            user.avatar,
        );

        return this.userRepo.save(user);
    }

    async insert(data: Partial<AppUser>) {
        return this.userRepo.save(this.userRepo.create(data));
    }
}
