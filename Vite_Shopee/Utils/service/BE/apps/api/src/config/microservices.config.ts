import { Injectable } from '@nestjs/common';
import { ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class SystemConfigMicroService implements ClientsModuleOptionsFactory {
  createClientOptions(): any {
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

    return transportOptions;
  }
}