import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('auth.created')
  handleCreatedEvent(event: any) {
    // await this.client.send('sendEmailWelcome', {}).toPromise();
  }

  @OnEvent('auth.forgotPassword')
  async handleForgotPasswordEvent(event: any) {
    await this.client.send('sendEmailForgotPassword', event).toPromise()
  }
}