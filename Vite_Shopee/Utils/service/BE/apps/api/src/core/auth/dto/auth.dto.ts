import { GeneratedUserEntity } from '@generated/user.dto';
import { Exclude } from 'class-transformer';
import { PartialType, OmitType, PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(GeneratedUserEntity, ['email', 'password'] as const) {}

export class UserLoginedDto extends OmitType(GeneratedUserEntity,
  ['news', 'password', 'currentHashedRefreshToken', 'twoFactorAuthenticationSecret'] as const
) {
  accessToken: string
}
