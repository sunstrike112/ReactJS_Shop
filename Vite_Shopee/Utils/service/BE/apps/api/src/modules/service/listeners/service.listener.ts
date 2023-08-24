import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class ServiceListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('services.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('services.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('services.deleted')
  handleDeletedEvent(event: any) {}
}