import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class GlobalSettingListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('global-settings.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('global-settings.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('global-settings.deleted')
  handleDeletedEvent(event: any) {}
}