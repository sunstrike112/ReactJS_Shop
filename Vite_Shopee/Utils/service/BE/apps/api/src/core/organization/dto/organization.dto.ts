import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedOrganizationEntity } from '@generated/organization.dto';

export class OrganizationDto extends OmitType(
  GeneratedOrganizationEntity,
  ['parent', 'children', 'news', 'users', 'userPermissions'] as const
) {
  // parent: OrganizationDto
}