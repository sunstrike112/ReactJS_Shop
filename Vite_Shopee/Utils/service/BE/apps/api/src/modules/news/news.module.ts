import { CacheModule, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CrudModule } from '@core/crud/crud.module';
import { PrismaService } from '@core/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';
import { CaslModule } from '@core/casl/casl.module';
import { NewsListener } from './listeners/news.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SystemConfigMicroService } from '@config/microservices.config';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService, NewsListener],
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
  exports: [NewsService]
})
export class NewsModule {}