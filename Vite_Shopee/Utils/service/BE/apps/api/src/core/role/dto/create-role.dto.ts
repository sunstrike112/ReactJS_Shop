import { PartialType, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { GeneratedRoleEntity } from '@generated/role.dto';
import { RolePermissionDto } from './role.dto';

export class CreateRoleDto extends OmitType(GeneratedRoleEntity, ['users', 'rolePermission' , 'createdAt', 'updatedAt', 'deletedAt'] as const) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string

  @IsOptional()
  @IsString()
  code: string

  @IsOptional()
  @IsInt()
  level: number

  @IsOptional()
  @IsBoolean()
  isActive: boolean

  rolePermission?: RolePermissionDto
}
