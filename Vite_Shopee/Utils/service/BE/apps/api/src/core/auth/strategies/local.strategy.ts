import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { hashValue } from '@helpers/hash.helper';
import { CaslAbilityFactory } from '@core/casl/casl-ability.factory';
import { PrismaService } from '@core/prisma/prisma.service';
import { GeneratedNewsEntity } from '@generated/news.dto'
import { subject } from '@casl/ability';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private caslAbilityFactory: CaslAbilityFactory,
    private prisma: PrismaService,
  ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.getAuthenticatedUser(email, password);
    return user;
  }
}