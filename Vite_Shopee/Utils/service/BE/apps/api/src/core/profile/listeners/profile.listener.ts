import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class ProfileListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('profiles.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('profiles.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('profiles.deleted')
  handleDeletedEvent(event: any) {}
}