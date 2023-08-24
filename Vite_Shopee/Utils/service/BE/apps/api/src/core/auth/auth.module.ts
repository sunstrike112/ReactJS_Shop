import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { CaslModule } from '../casl/casl.module';
import { ClientsModule } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { ProfileService } from '@core/profile/profile.service';
import { CacheConfigService } from '@config/cache-config.service';
import { JwtTwoFactorStrategy } from './strategies/jwt-two-factor.strategy';
import { AuthListener } from './listeners/auth.listener';
import { AzureADStrategy } from './strategies/azure-ad.stategy';
import { CustomerModule } from '@modules/customer/customer.module';

@Module({
  imports: [
    forwardRef(() => CaslModule),
    forwardRef(() => UserModule),
    PrismaModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'SYSTEM_SERVICE',
        useClass: SystemConfigMicroService,
      }
    ]),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    CustomerModule,
  ],
  providers: [
    ProfileService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtTwoFactorStrategy,
    AuthListener,
    AzureADStrategy
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
