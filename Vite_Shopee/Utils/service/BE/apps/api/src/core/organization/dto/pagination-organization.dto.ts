import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { OrganizationDto } from './organization.dto';

export class OrganizationItemsDto {
  items: OrganizationDto[]
}

export class PaginationOrganizationDto extends IntersectionType(
  OrganizationItemsDto,
  PaginationDto,
) {}
