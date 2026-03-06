import { Injectable } from "@nestjs/common";
import { ERole } from "../decorators/roles.decorator";
import { AppUser } from "../../modules/user/entities/app-user.entity";
import { UserRepository } from "../../modules/user/repositories/user.repository";
import { TAction } from "../base/services/base-crud.service";

@Injectable()
export class OwnershipService {
    constructor(
        private readonly userRepo: UserRepository,
    ) { }

    async can(
        action: TAction,
        curUser: AppUser,
        targetEntity?: { createdBy: number },
    ): Promise<boolean> {

        /* 1️⃣ ADMIN = Absolute Superuser */
        if (this.isAdmin(curUser)) {
            return true;
        }

        /* 2️⃣ CREATE (no entity yet) */
        if (action === 'create') {
            return this.canCreate(curUser);
        }

        const ownerId = targetEntity?.createdBy;

        /* From here, entity must exist */
        if (ownerId === undefined) {
            return false;
        }

        /* 3️⃣ SYSTEM RECORD PROTECTION */
        if (ownerId === 0) {
            return false;
        }

        /* 4️⃣ EXTERNAL USERS */
        if (!curUser.isInternal) {
            return ownerId === curUser.id;
        }

        /*5️⃣ PROTECT ADMIN-CREATED RECORDS (only for update/delete) */
        if (action === 'update' || action === 'delete') {
            const isAdminOwner = await this.isAdminOwner(ownerId);
            if (isAdminOwner) {
                return false;
            }
        }

        /* 6️⃣ OWN RECORDS (Internal Users) // Always allowed (except system handled above) */
        if (ownerId === curUser.id) {
            return true;
        }

        /* 7️⃣ ROLE-BASED "ANY" PERMISSIONS */
        return this.canByRole(curUser, action);
    }

    private isAdmin(user: AppUser): boolean {
        return user.isInternal &&
            user.role === ERole.ADMIN;
    }

    private async isAdminOwner(ownerId: number): Promise<boolean> {
        const owner = await this.userRepo.get({ id: ownerId })
        return !!(
            owner &&
            owner.isInternal &&
            owner.role === ERole.ADMIN
        );
    }

    private canCreate(user: AppUser): boolean {
        if (!user.isInternal) {
            return true; // external can create own
        }
        return user.role! >= ERole.CREATOR;
    }

    private canByRole(user: AppUser, action: TAction): boolean {
        const role = user.role!;

        switch (action) {
            case 'read':
                return true; // VIEWER+ can read any

            case 'update':
                return role >= ERole.MODIFIER;

            case 'delete':
                return false; // only ADMIN can delete any

            case 'create':
                return role >= ERole.CREATOR;

            default:
                return false;
        }
    }
}
