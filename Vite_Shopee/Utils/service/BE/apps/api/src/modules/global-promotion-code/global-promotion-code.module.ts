import { CacheModule, Module } from '@nestjs/common';
import { GlobalPromotionCodeService } from './global-promotion-code.service';
import { GlobalPromotionCodeController } from './global-promotion-code.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { GlobalPromotionCodeListener } from './listeners/global-promotion-code.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [GlobalPromotionCodeController],
  providers: [GlobalPromotionCodeService, PrismaService, GlobalPromotionCodeListener],
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
  exports: [GlobalPromotionCodeService]
})
export class GlobalPromotionCodeModule {}