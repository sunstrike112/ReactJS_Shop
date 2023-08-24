import { CacheModule, Module } from '@nestjs/common';
import { GlobalSettingService } from './global-setting.service';
import { GlobalSettingController } from './global-setting.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { GlobalSettingListener } from './listeners/global-setting.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [GlobalSettingController],
  providers: [GlobalSettingService, PrismaService, GlobalSettingListener],
  imports: [
    CaslModule,
    CrudModule,
    ConfigModule,
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    ClientsModule.registerAsync([
      {
        name: 'SYSTEM_SERVICE',
        useClass: SystemConfigMicroService,
      }
    ]),
  ],
  exports: [GlobalSettingService]
})
export class GlobalSettingModule {}