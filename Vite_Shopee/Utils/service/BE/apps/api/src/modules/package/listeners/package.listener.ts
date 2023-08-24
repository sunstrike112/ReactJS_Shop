import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class PackageListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('packages.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('packages.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('packages.deleted')
  handleDeletedEvent(event: any) {}
}