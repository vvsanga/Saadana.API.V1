import { ETokenType } from "../constants/auth.enum";

export interface ITokenPolicy {
    type: ETokenType;
    expiresSec: number;
    maxActive: number;
    revokeOnIssue: boolean;
    singleUse: boolean;
}
