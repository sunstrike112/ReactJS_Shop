import { PartialType, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { GeneratedOrganizationEntity } from '@generated/organization.dto';
import { GeneratedOrganizationType } from '@generated/organization-type.enum';

export class CreateOrganizationDto extends OmitType(
  GeneratedOrganizationEntity,
  ['id', 'type', 'isActive', 'parentId', 'parent', 'children', 'news', 'type', 'users', 'userPermissions', 'createdAt', 'updatedAt', 'deletedAt'] as const
) {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  contactEmail: string;
}