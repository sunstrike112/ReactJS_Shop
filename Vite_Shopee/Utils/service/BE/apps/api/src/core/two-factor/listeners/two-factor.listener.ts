import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TwoFactorListener {

  constructor(
    @Inject('SYSTEM_SERVICE') private client: ClientProxy
  ) {}

  @OnEvent('2fa.qrCode')
  async handleQrCodeEvent(event: any) {
    await this.client.send('sendEmail2FA', event).toPromise();
  }
}