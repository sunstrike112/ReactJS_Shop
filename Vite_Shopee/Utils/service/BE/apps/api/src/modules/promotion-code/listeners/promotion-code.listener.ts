/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class PromotionCodeListener {
  constructor(@Inject('SYSTEM_SERVICE') private client: ClientProxy) {}

  @OnEvent('promotion-codes.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('promotion-codes.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('promotion-codes.deleted')
  handleDeletedEvent(event: any) {}
}
