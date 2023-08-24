import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class NewsListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('news.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('news.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('news.deleted')
  handleDeletedEvent(event: any) {}
}