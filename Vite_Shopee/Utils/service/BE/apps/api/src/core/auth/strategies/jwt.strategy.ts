import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { UserService } from '@core/user/user.service';
import { CaslAbilityFactory } from '@core/casl/casl-ability.factory';
import { CustomerService } from '@modules/customer/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
    private customerService: CustomerService
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
    let user = null;

    if (!payload.isAdmin) {
      user = await this.customerService.findCustomerByEmail(payload.email);
      delete user.currentHashedRefreshToken;
      return user;
    }

    user = await this.userService.findUserByEmail(payload.email);
    delete user.currentHashedRefreshToken;
    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (payload.isTwoFactorAuthenticationEnabled) {
      return user;
    }
  }
}