import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { UserModule } from '@system-core/user/user.module';
import { MailModule } from '@system-core/mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueModule, SyncQueueDriver } from '@squareboat/nest-queue';
import { SqsQueueDriver } from '@squareboat/nest-queue-sqs';
import { RedisQueueDriver } from '@squareboat/nest-queue-redis';
import { QueueWorkerCommand } from './commands/queue-woker.command';
import { ConsoleModule } from 'nestjs-console';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from '@squareboat/nest-events';
import { PrismaModule } from '@system-core/prisma/prisma.module';
// import { SqsModule } from '@ssut/nestjs-sqs';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    PrismaModule,
    EventEmitterModule.forRoot(),
    EventModule.register(),
    // SqsModule.register({
    //   consumers: [],
    //   producers: [],
    // }),
    QueueModule.register({
      isGlobal: true,
      default: 'notifications',
      connections: {
        notifications: {
          driver: SyncQueueDriver,
        },
      },
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
          filename: 'system-error-%DATE%.log',
          dirname: './logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        }),
        // Http Log File
        new DailyRotateFile({
          level: 'verbose',
          filename: 'system-http-%DATE%.log',
          dirname: './logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        })
      ],
    }),
    UserModule,
    MailModule,
    ScheduleModule.forRoot(),
    ConsoleModule,
  ],
  controllers: [SystemController],
  providers: [SystemService, QueueWorkerCommand],
})
export class SystemModule {}
