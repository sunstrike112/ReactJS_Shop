import { CacheModule, Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { PrismaModule } from '@core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@config/cache-config.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env'//`.env.${process.env.NODE_ENV || 'development'}`
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //     useFactory: (configService: ConfigService) => ({
    //       store: redisStore,
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('REDIS_PORT'),
    //       ttl: 120
    //     }),
    // }),
  ],
  providers: [CrudService],
  exports: [CrudService],
})
export class CrudModule {}
