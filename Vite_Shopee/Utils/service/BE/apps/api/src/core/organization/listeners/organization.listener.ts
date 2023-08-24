import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class OrganizationListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('organizations.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('organizations.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('organizations.deleted')
  handleDeletedEvent(event: any) {}
}