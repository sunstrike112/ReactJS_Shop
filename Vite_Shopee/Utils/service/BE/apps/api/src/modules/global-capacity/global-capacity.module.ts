import { CacheModule, Module } from '@nestjs/common';
import { GlobalCapacityService } from './global-capacity.service';
import { GlobalCapacityController } from './global-capacity.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { GlobalCapacityListener } from './listeners/global-capacity.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [GlobalCapacityController],
  providers: [GlobalCapacityService, PrismaService, GlobalCapacityListener],
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
  exports: [GlobalCapacityService]
})
export class GlobalCapacityModule {}