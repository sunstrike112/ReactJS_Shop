import { CacheModule, Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { ServiceListener } from './listeners/service.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService, ServiceListener],
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
  exports: [ServiceService]
})
export class ServiceModule {}