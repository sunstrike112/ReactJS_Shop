import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class GlobalCapacityListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('global-capacities.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('global-capacities.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('global-capacities.deleted')
  handleDeletedEvent(event: any) {}
}