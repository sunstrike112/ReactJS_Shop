import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SystemModule } from './system.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  // const app = await NestFactory.create(SystemModule);

  let transportOptions: any = {
    transport: Transport.TCP,
    options: {},
  };

  if (process.env.TRANSPORT_PROVIDER) {
    if (process.env.TRANSPORT_PROVIDER === 'tcp') {
      transportOptions['options']['host'] = process.env.TRANSPORT_TCP_HOST;
      transportOptions['options']['port'] = process.env.TRANSPORT_TCP_PORT;
    }
    if (process.env.TRANSPORT_PROVIDER === 'redis') {
      transportOptions['transport'] = Transport.REDIS;
      transportOptions['options']['url'] = process.env.TRANSPORT_REDIS_URL;
    }
    if (process.env.TRANSPORT_PROVIDER === 'nats') {
      transportOptions['transport'] = Transport.NATS;
      transportOptions['options']['url'] = process.env.TRANSPORT_NATS_URL;
    }
  }
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SystemModule,
    transportOptions,
  );

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  // await app.listen(3100);
  await app.listen(async () => {
    console.log('Microservice is listening');
  });
}
bootstrap();
