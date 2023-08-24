import { Injectable } from '@nestjs/common';
import { Job } from '@squareboat/nest-queue';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { JobName } from '@system-core/enums/job.enum';
import { MailService } from '../mail.service';

@Injectable()
export class MailHandler {
  constructor(
    private mailService: MailService,
  ) {}

  @SqsMessageHandler('send_mail', false)
  public async handleMessage(message: AWS.SQS.Message) {
    const data = JSON.parse(message.Body);
    await this.mailService.sendMail(data.payload, data.mjmlTemplateName, data.to, data.subject, data.from)
  }
  
  @SqsConsumerEventHandler('send_mail', 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    console.log({error});
    console.log({message});
  }

  // Using Job of Sync Queue
  @Job('send_mail', { delay: 10 })
  async jobSendEmail(data: Record<string, any>) {
    await this.mailService.sendMail(data.payload, data.mjmlTemplateName, data.to, data.subject, data.from);
  }
}