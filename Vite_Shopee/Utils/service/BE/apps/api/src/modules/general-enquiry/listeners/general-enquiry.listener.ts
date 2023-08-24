/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class GeneralEnquiryListener {
  constructor(@Inject('SYSTEM_SERVICE') private client: ClientProxy) {}

  @OnEvent('general-enquiry.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('general-enquiry.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('general-enquiry.deleted')
  handleDeletedEvent(event: any) {}

  @OnEvent('customer.GeneralEnquiry')
  async handleGeneralEnquiry(event: any) {
    await this.client.send('sendEmailCustomerGeneralEnquiry', event).toPromise();
  }
}
