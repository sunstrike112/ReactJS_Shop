import { BadRequestException, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL, toFileStream } from 'qrcode';
import { Response } from 'express';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TwoFactorService {
  constructor (
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {}

  public async toggleTwoFactorAuthenticationSetting(user: UserDto, isEnableTwoFactorAuth: boolean) {
    let qrCode = null;
    if (isEnableTwoFactorAuth) {
      qrCode = await this._genrerateQrCode(user);
    }

    await this.userService.toggleTwoFactorAuthentication(user.email, isEnableTwoFactorAuth);

    return qrCode;
  }

  /**
   * Generate QR code and send mail
   * @param user 
   */
  private async _genrerateQrCode(user: UserDto) {
    const { otpauthUrl } = await this._generateTwoFactorAuthenticationSecret(user);
    const qrCodeBase64 = await this._generateQrCodeToBase64(otpauthUrl);

    return qrCodeBase64;
    // this.eventEmitter.emit('2fa.qrCode', {user, qrCodeBase64});
  }

  private async _generateTwoFactorAuthenticationSecret(user: UserDto) {
    let secret = user.twoFactorAuthenticationSecret;
    if (!user.twoFactorAuthenticationSecret) {
      secret = authenticator.generateSecret();
      await this.userService.setTwoFactorAuthenticationSecret(secret, user.email);
    }
    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);

    return {
      secret,
      otpauthUrl
    }
  }

  private _isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, twoFactorAuthenticationSecret: string) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: twoFactorAuthenticationSecret
    })
  }

  public async getQrCode(user) {
    const { twoFactorAuthenticationSecret } = await this.userService.findUserByEmail(user.email, {
      twoFactorAuthenticationSecret: true
    });

    if (!twoFactorAuthenticationSecret) {
      return;
    }

    user.twoFactorAuthenticationSecret = twoFactorAuthenticationSecret;

    return await this._genrerateQrCode(user);
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  private async _generateQrCodeToBase64(otpauthUrl: string) {
    const qrCodeBase64 = await toDataURL(otpauthUrl);

    return qrCodeBase64;
  }

  public async validateRequest(twoFactorAuthenticationCode: string, user: UserDto) {
    const { twoFactorAuthenticationSecret } = await this.userService.findUserByEmail(user.email, {
      twoFactorAuthenticationSecret: true
    });

    if (!twoFactorAuthenticationSecret) {
      throw new BadRequestException("Two factor authentication is disabled.");
    }

    const isCodeValid = this._isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, twoFactorAuthenticationSecret
    );
    if (!isCodeValid) {
      throw new BadRequestException('The Verification Code is not matched.');
    }
  }
}
