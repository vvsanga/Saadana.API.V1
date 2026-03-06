import { ITokenPolicy } from "../models/token.model";
import { ETokenType } from "./auth.enum";

export const C_TOKEN_EXP = {
    PWD_RESET_SEC: 15 * 60,
    REFRESH_SEC: 15 * 60,
};

export const RefreshTokenPolicy: ITokenPolicy = {
    type: ETokenType.REFRESH,
    expiresSec: C_TOKEN_EXP.REFRESH_SEC,
    maxActive: 5,
    revokeOnIssue: true,
    singleUse: false,
};

export const PasswordResetTokenPolicy: ITokenPolicy = {
    type: ETokenType.PWD_RESET,
    expiresSec: C_TOKEN_EXP.PWD_RESET_SEC,
    maxActive: 1,
    revokeOnIssue: true,
    singleUse: true,
};

const TOKEN_POLICIES: Record<ETokenType, ITokenPolicy> = {
    [ETokenType.REFRESH]: RefreshTokenPolicy,
    [ETokenType.PWD_RESET]: PasswordResetTokenPolicy,
};

export const getTokenPolicy = (type: ETokenType): ITokenPolicy =>
    TOKEN_POLICIES[type];