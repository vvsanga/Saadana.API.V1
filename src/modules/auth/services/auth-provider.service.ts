import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { C_AUTH } from '../constants/auth.const';
import { EAuthProvider } from '../constants/auth.enum';
import { IOAuthProfile } from '../models/auth.model';

@Injectable()
export class AuthProviderService {
  private googleClient = new OAuth2Client(C_AUTH.OAUTH.CLIENT_ID.GOOGLE);

  async verifyGoogleToken(accessToken: string): Promise<IOAuthProfile> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: accessToken,
      audience: C_AUTH.OAUTH.CLIENT_ID.GOOGLE,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new UnauthorizedException('Invalid Google token');

    return {
      provider: EAuthProvider.GOOGLE,
      providerId: payload['sub'] ?? '',
      email: payload['email'] ?? '',
      emailVerified: payload['email_verified'] ?? false,
      givenName: payload['given_name'] ?? undefined,
      familyName: payload['family_name'] ?? undefined,
      name: payload['name'] ?? undefined,
      picture: payload['picture'] ?? undefined,
      locale: payload['locale'] ?? undefined,
    };
  }

  async verifyFacebookToken(accessToken: string): Promise<IOAuthProfile> {
    // Example: call Facebook Graph API /debug_token and /me endpoints
    // Replace with axios/fetch in real app
    throw new UnauthorizedException('Facebook verification not implemented yet');
  }

  async verifyAppleToken(accessToken: string): Promise<IOAuthProfile> {
    // Example: validate JWT signature against Apple public keys
    // Parse claims (sub, email, etc.)
    throw new UnauthorizedException('Apple verification not implemented yet');
  }
}
