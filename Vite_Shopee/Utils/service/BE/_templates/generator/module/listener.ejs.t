---
to: apps/api/src/<%= type %>/<%= name %>/listeners/<%=name%>.listener.ts
---

import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class <%= h.changeCase.pascal(Name) %>Listener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('<%= h.inflection.pluralize(name) %>.created')
  handleCreatedEvent(event: any) {}

  @OnEvent('<%= h.inflection.pluralize(name) %>.updated')
  handleUpdatedEvent(event: any) {}

  @OnEvent('<%= h.inflection.pluralize(name) %>.deleted')
  handleDeletedEvent(event: any) {}
}