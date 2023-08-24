import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class VehicleListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('vehicles.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('vehicles.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('vehicles.deleted')
  handleDeletedEvent(event: any) {}
}