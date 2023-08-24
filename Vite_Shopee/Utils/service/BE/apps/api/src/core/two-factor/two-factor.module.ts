import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { TwoFactorController } from './two-factor.controller';
import { ClientsModule } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';
import { TwoFactorListener } from './listeners/two-factor.listener';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    ClientsModule.registerAsync([
      {
        name: 'SYSTEM_SERVICE',
        useClass: SystemConfigMicroService,
      }
    ]),
  ],
  providers: [
    TwoFactorService,
    TwoFactorListener,
  ],
  controllers: [TwoFactorController]
})
export class TwoFactorModule {}
