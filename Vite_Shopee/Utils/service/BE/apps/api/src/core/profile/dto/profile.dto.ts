import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedUserEntity } from '@generated/user.dto';
import { Exclude } from 'class-transformer';
import { GeneratedUserPermissionEntity } from '@generated/user-permission.dto';
import { RoleDto } from '@core/role/dto/role.dto';

export class ProfilePermissionDto extends OmitType(GeneratedUserPermissionEntity, ['user'] as const) {}
export class ProfileDto extends OmitType(GeneratedUserEntity,
  [
    'news', 'password', 'currentHashedRefreshToken', 'twoFactorAuthenticationSecret',
    'currentHashedRefreshToken', 'roles', 'userPermissions'
  ] as const
) {
  roles: RoleDto[];
  userPermissions: ProfilePermissionDto[]
}
