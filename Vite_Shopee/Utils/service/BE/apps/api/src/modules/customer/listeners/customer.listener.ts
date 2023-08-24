import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class CustomerListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('customers.created')
  async handleCreatedEvent(event: any) {
    await this.client.send('sendEmailWelcome', event).toPromise();
  }

  @OnEvent('customer.created.admin')
  async handleAdminCreatedEvent(event: any) {
    await this.client.send('sendEmailCustomerForgotPassword', event).toPromise();
  }

  @OnEvent('customers.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('customers.deleted')
  handleDeletedEvent(event: any) {}

  @OnEvent('customer.forgotPassword')
  async handleForgotPassword(event: any) {
    await this.client.send('sendEmailCustomerForgotPassword', event).toPromise();
  }
}