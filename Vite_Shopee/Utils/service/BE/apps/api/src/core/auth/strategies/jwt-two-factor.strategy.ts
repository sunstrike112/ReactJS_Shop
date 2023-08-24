import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '@core/user/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor'
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
      //   return request?.cookies?.Authentication;
      // }]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.findUserByEmail(payload.email);
    delete user.currentHashedRefreshToken;
    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (payload.isTwoFactorAuthenticationEnabled) {
      return user;
    }
  }
}