import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class GlobalPromotionCodeListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('global-promotion-codes.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('global-promotion-codes.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('global-promotion-codes.deleted')
  handleDeletedEvent(event: any) {}
}