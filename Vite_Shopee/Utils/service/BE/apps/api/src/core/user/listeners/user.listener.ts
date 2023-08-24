import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class UserListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('users.created')
  async handleCreatedEvent(event: any) {
    await this.client.send('sendEmailWelcome', event).toPromise();
  }

  @OnEvent('users.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('users.deleted')
  handleDeletedEvent(event: any) {}
}