import { CacheModule, Module } from '@nestjs/common';
import { PromotionCodeService } from './promotion-code.service';
import { PromotionCodeController } from './promotion-code.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { PromotionCodeListener } from './listeners/promotion-code.listener';
import { ClientsModule } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [PromotionCodeController],
  providers: [PromotionCodeService, PrismaService, PromotionCodeListener],
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
  exports: [PromotionCodeService]
})
export class PromotionCodeModule {}