import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { C_AUTH } from '../constants/auth.const';
import { EAuthProvider } from '../constants/auth.enum';
import { IOAuthProfile } from '../models/auth.model';

@Injectable()
export class AuthProviderService {
    private client = new OAuth2Client(C_AUTH.OAUTH.CLIENT_ID.GOOGLE);

    async verifyGoogleToken(token: string): Promise<IOAuthProfile> {

        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: C_AUTH.OAUTH.CLIENT_ID.GOOGLE
        });

        const payload = ticket.getPayload();

        return {
            provider: EAuthProvider.GOOGLE,
            providerId: payload?.sub,
            email: payload?.email,
            name: payload?.name,
            familyName: payload?.family_name,
            givenName: payload?.given_name,
            picture: payload?.picture,
            emailVerified: payload?.email_verified,
            locale: payload?.locale
        };
    }

    async verifyFacebookToken(token: string): Promise<IOAuthProfile> {
        // Example: call Facebook Graph API /debug_token and /me endpoints
        // Replace with axios/fetch in real app
        throw new UnauthorizedException('Facebook verification not implemented yet');
    }

    async verifyAppleToken(token: string): Promise<IOAuthProfile> {
        // Example: validate JWT signature against Apple public keys
        // Parse claims (sub, email, etc.)
        throw new UnauthorizedException('Apple verification not implemented yet');
    }
}
