import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class BookingListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('bookings.created')
  async handleCreatedEvent(event: any) {
    await this.client.send('sendBookingConfirmation', event).toPromise();
  }

  @OnEvent('bookings.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('bookings.deleted')
  handleDeletedEvent(event: any) {}
}