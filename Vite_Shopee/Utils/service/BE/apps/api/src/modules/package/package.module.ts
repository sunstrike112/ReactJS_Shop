import { CacheModule, Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { PackageListener } from './listeners/package.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PrismaService, PackageListener],
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
  exports: [PackageService]
})
export class PackageModule {}