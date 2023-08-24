import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from '@core/prisma/prisma.module';
import { CrudModule } from '@core/crud/crud.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from '@filters/logger-exception.filter';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Joi from '@hapi/joi';
// import * as Sentry from 'winston-sentry-log';
// import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheConfigService } from '@config/cache-config.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { StorageModule } from '@squareboat/nest-storage';
import filesystem from '@config/filesystem';
// import { ConfigModule as ConfigExtendModule, ConfigService as ConfigExtendService} from 'nestjs-config';
import * as path from 'path';

// Start Import Modules

import { NewsModule } from '@modules/news/news.module';
import { UserModule } from '@core/user/user.module';
import { AuthModule } from '@core/auth/auth.module';
import { TwoFactorModule } from '@core/two-factor/two-factor.module';
import { CaslModule } from '@core/casl/casl.module';
import { RoleModule } from '@core/role/role.module';
import { ProfileModule } from '@core/profile/profile.module';
import { CountryModule } from './core/country/country.module';
import { FilesModule } from './core/files/files.module';
import { OrganizationModule } from '@core/organization/organization.module';
import { EnumsModule } from './core/enums/enums.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { AuthCustomerModule } from '@core/auth/auth-customer.module';
import { ResourceModule } from '@core/resource/resource.module';
import { ServiceModule } from '@modules/service/service.module';
import { PackageModule } from '@modules/package/package.module';
import { CapacityModule } from '@modules/capacity/capacity.module';
import { GlobalCapacityModule } from '@modules/global-capacity/global-capacity.module';
import { GlobalSettingModule } from '@modules/global-setting/global-setting.module';
import { BookingModule } from '@modules/booking/booking.module';
import { BookingAppointmentModule } from './modules/booking-appointment/booking-appointment.module';
import { PromotionCodeModule } from '@modules/promotion-code/promotion-code.module';
import { GlobalPromotionCodeModule } from '@modules/global-promotion-code/global-promotion-code.module';
import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { GeneralEnquiryModule } from '@modules/general-enquiry/general-enquiry.module';
// End Import Modules

const ImportModules = [
  GeneralEnquiryModule,
  VehicleModule,
  GlobalPromotionCodeModule,
  BookingModule,
  GlobalCapacityModule,
  GlobalSettingModule,
  ResourceModule,
  OrganizationModule,
  ProfileModule,
  RoleModule,
  UserModule,
  NewsModule,
  VehiclesModule,
  CustomerModule,
  ServiceModule,
  PackageModule,
  CapacityModule,
  BookingAppointmentModule,
  PromotionCodeModule,
]

// const Sentry = require('winston-transport-sentry-node').default;

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PrismaModule,
    CrudModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [filesystem],
      envFilePath: '.env',//`.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        CACHE_TTL: Joi.number().required(),
      })
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // dest: config.get('LOCAL_UPLOAD_DEST'),
      }),
      inject: [ConfigService],
    }),
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem')
      },
      inject: [ConfigService]
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.Http({
          level: 'warn',
          format: winston.format.json()
        }),
        // Error Log File
        new DailyRotateFile({
          level: 'error',
          filename: 'error-%DATE%.log',
          dirname: './logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        }),
        // Http Log File
        new DailyRotateFile({
          level: 'verbose',
          filename: 'http-%DATE%.log',
          dirname: './logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        })
      ],
    }),
    ...ImportModules,
    TwoFactorModule,
    CaslModule,
    CountryModule,
    FilesModule,
    EnumsModule,
    AuthCustomerModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
