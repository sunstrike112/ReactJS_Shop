import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from '@system-core/mail/mail.module';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsMailConfigService } from '@system-config/sqs-mail-config.service'
import { ConfigModule } from '@nestjs/config';
import { UserCron } from './crons/user.cron';

@Module({
  controllers: [UserController],
  providers: [UserService, UserCron],
  imports: [
    MailModule,
    SqsModule.registerAsync({
      useClass: SqsMailConfigService,
    }),
    ConfigModule,
  ]
})
export class UserModule {}
