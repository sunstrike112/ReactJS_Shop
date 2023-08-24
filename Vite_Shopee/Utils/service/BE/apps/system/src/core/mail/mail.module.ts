import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MailHandler } from './handlers/mail.handler';
import { SqsMailConfigService } from '@system-config/sqs-mail-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          // secure: process.env.SMTP_SECURE,
          auth: {
            user: process.env.SMTP_AUTH_USERNAME,
            pass: process.env.SMTP_AUTH_PASSWORD
          }
        },
        defaults: {
          from: process.env.MAIL_FROM,
        }
      })
    }),
    SqsModule.registerAsync({
      useClass: SqsMailConfigService,
    }),
    ConfigModule,
  ],
  providers: [MailService, MailHandler],
  exports: [MailService],
})
export class MailModule {}
