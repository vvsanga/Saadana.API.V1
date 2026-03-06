import { EAuthProvider } from "../constants/auth.enum";

export interface IJwtToken {
  token: string;
  expiresSec: number; // seconds
  expiresAt: Date;   // expiration timestamp
  issuedAt: Date;  // Issued At
}

export interface IJwtPayload {
  sid: string;   // Session ID
  sub: string;   // User ID (DB PK)
  uid: string;   // Public/business UUID
  provider: string;
  aud?: string;  // Audience (ERP API identifier)
  iss?: string;  // Issuer (Auth service identifier)
  // jti?: string;  // JWT ID (unique token id)
}

export interface IJwtAccessPayload extends IJwtPayload {
  type: 'access';
  email: string;
  role: string;      // Permissions roles
  isInternal: boolean;  // Internal/external scope
  tokenVersion: number; // Invalidate old tokens on reset/logout
}

export interface IJwtRefreshPayload extends IJwtPayload {
  type: 'refresh';
  deviceId?: string;    // Optional: per-device refresh control
}

export interface IOAuthProfile {
  provider?: EAuthProvider;
  providerId?: string;   // Google `sub`, Apple `sub`, Facebook `id`
  email?: string;
  emailVerified?: boolean;
  givenName?: string;
  familyName?: string;
  name?: string;
  picture?: string;
  locale?: string;
  domain?: string;
  phone?: string;
  phoneVerified?: boolean;
}
