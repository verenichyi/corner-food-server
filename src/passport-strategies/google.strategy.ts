import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URI}/auth/login/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken,
    refreshToken,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { emails, photos, displayName } = profile;
    const user = {
      email: emails[0].value,
      username: displayName,
      profileImage: photos[0].value,
    };
    done(null, user);
  }
}
