import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateNested,
  IsArray,
  IsDefined,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { MSG_INVALID_STRUCTURE_FORMAT_PERMISSION } from '@constants/messages.constant';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Exclude()
  email: string
}

class PermissionItemDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  resource: string;
}

@ValidatorConstraint()
export class IsPermissionArray implements ValidatorConstraintInterface {
  public async validate(permissionItemDto: PermissionItemDto[], args: ValidationArguments) {
    return Array.isArray(permissionItemDto) &&
      permissionItemDto.reduce(
        (a, b) => a &&
        typeof b.action === "string" &&
        typeof b.resource === "string", true
      );
  }
}

export class UserPermissionsDto {
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(IsPermissionArray, {
    message: MSG_INVALID_STRUCTURE_FORMAT_PERMISSION,
  })
  permissions?: PermissionItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(IsPermissionArray, {
    message: MSG_INVALID_STRUCTURE_FORMAT_PERMISSION,
  })
  forbidden?: PermissionItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(IsPermissionArray, {
    message: MSG_INVALID_STRUCTURE_FORMAT_PERMISSION,
  })
  defaultPermissions?: PermissionItemDto[];
}

export class DeleteUserPermissionsDto {
  @IsOptional()
  roleId?: number;

  @IsNumber()
  @IsNotEmpty()
  organizationId: number;
}