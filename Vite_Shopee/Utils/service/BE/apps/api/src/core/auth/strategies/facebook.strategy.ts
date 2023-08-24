import { GeneratedGender } from '@generated/gender.enum';
import { GeneratedProvider } from '@generated/provider.enum';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { emails, name, gender } = profile;
    const user = {
      email: emails[0].value,
      firstName: name && name.givenName,
      lastName: name && name.familyName,
      gender: gender ? gender : GeneratedGender[GeneratedGender.unknown],
      provider: GeneratedProvider[GeneratedProvider.facebook],
    }

    done(null, user);
  }
}
