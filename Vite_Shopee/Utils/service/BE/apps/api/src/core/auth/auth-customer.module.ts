import { CaslModule } from '@core/casl/casl.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthCustomerController } from './auth-customer.controller';
import { AuthCustomerService } from './auth-customer.service';
import { AuthModule } from './auth.module';
import { CustomerLocalStrategy } from './strategies/customer-local.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

@Module({
  controllers: [AuthCustomerController],
  imports: [
    forwardRef(() =>CaslModule),
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
    forwardRef(() => CustomerModule),
    forwardRef(() => AuthModule),
  ],
  providers: [
    AuthCustomerService,
    CustomerLocalStrategy,
    FacebookStrategy,
    GoogleStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthCustomerService]
})
export class AuthCustomerModule {}
