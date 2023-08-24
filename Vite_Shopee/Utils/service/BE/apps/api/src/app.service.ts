import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime, Settings } from "luxon";
import { convertDateTime } from '@helpers/datetime.helper';

@Injectable()
export class AppService {

  constructor(
    public configService: ConfigService,
  ) {}

  onModuleInit() {
    this.setupDefaultTimezone();
  }

  private setupDefaultTimezone() {
    Settings.defaultZoneName = this.configService.get<string>('TZ') || 'UTC';
    Settings.defaultLocale = this.configService.get<string>('LOCALE') || 'en';
  }
}
