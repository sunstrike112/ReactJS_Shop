import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TwoFactorAuthDto {
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode: string;
}

export class TwoFactorSettingDto {
  @IsBoolean()
  isEnableTwoFactorAuth: boolean = false;
}
