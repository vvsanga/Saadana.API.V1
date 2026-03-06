import { SetMetadata } from "@nestjs/common";

export enum ERole {
    VIEWER = 1,
    CREATOR = 2,
    MODIFIER = 3,
    ADMIN = 4,
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);

// export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
// export const UserOnly = () => Roles(ERole.USER);
// export const ManagerOnly = () => Roles(ERole.MANAGER);
// export const AdminOnly = () => Roles(ERole.ADMIN);