import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class ResourceListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('resources.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('resources.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('resources.deleted')
  handleDeletedEvent(event: any) {}
}