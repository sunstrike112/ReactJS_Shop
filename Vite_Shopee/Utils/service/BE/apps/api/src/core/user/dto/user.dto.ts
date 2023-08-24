import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedUserEntity } from '@generated/user.dto';
import { RoleDto } from '@core/role/dto/role.dto';
import { OrganizationDto } from '@core/organization/dto/organization.dto';
import { Exclude, Expose } from 'class-transformer';
import { GeneratedUserPermissionEntity } from '@generated/user-permission.dto';

export class UserPermissionDto extends OmitType(GeneratedUserPermissionEntity, ['user', 'organization'] as const) {}

export class UserDto extends OmitType(GeneratedUserEntity, ['password', 'news', , 'roles', 'userPermissions', 'organizations'] as const) {
  @Exclude()
  password: string;

  @Exclude()
  currentHashedRefreshToken: string;

  @Exclude()
  twoFactorAuthenticationSecret: string;
  
  roles: RoleDto[];
  userPermissions: UserPermissionDto[];
  organizations: OrganizationDto[];
}