import { Injectable } from '@nestjs/common';
// import { ClientProxyFactory, ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';
import { SqsModuleOptionsFactory } from '@ssut/nestjs-sqs/dist/sqs.types';
import { QueueName } from '@system-core/enums/queue.enum';

@Injectable()
export class SqsMailConfigService implements SqsModuleOptionsFactory {
  createOptions(): any {
    
    return {
      consumers: [
        {
          queueUrl:  `${process.env.QUEUE_SQS_PREFIX}/${process.env.QUEUE_SQS_QUEUE}`,
          region: process.env.QUEUE_SQS_REGION,
          name: QueueName.SendMail
        }
      ],
      producers: [
        {
          queueUrl:  `${process.env.QUEUE_SQS_PREFIX}/${process.env.QUEUE_SQS_QUEUE}`,
          region: process.env.QUEUE_SQS_REGION,
          name: QueueName.SendMail
        }
      ]
    }
  }
}