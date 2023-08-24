import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class RoleListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}
  
  @OnEvent('roles.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('roles.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('roles.deleted')
  handleDeletedEvent(event: any) {}
}