import { GeneratedProvider } from '@generated/provider.enum';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IProfile, OIDCStrategy } from 'passport-azure-ad';
import { VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  OIDCStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      clientID: process.env.AAD_CLIENT_ID,
      identityMetadata: `https://login.microsoftonline.com/${process.env.AAD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      redirectUrl: process.env.AAD_CALLBACK_URL,
      allowHttpForRedirectUrl: true,
      responseType: 'id_token',
      responseMode: 'form_post',
      useCookieInsteadOfSession: true,
      cookieEncryptionKeys: [{key: 'keJeUCZY6jpFQ6wfFUJRu3cVJ4trxLzy', iv:'z7FQVHvhtRXU'}],
      scope: ['profile', 'email'] 
    });
  }

  async validate(profile: IProfile, done: VerifyCallback) {
    const { name, emails, _json } = profile;

    let email;
    if (emails && emails[0] && emails[0].value) {
      email = emails[0].value;
    } else {
      email = _json.email;
    }

    const user = {
      email,
      firstName: name && name.givenName,
      lastName: name && name.familyName,
      provider: GeneratedProvider[GeneratedProvider.aad],
    }

    done(null, user);
  }
}