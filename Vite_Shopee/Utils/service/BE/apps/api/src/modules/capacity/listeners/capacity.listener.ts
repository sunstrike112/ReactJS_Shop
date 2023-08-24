import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class CapacityListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('capacities.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('capacities.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('capacities.deleted')
  handleDeletedEvent(event: any) {}
}