import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedRoleEntity } from '@generated/role.dto';
import { GeneratedRolePermissionEntity } from '@generated/role-permission.dto';

export class Permission {
  action: string
  resource: string
}

export class RoleDto extends OmitType(GeneratedRoleEntity, ['users', 'rolePermission'] as const) {
  rolePermission: RolePermissionDto
}

export class RolePermissionDto extends OmitType(GeneratedRolePermissionEntity, ['permissions'] as const) {
  permissions: Permission[]
}