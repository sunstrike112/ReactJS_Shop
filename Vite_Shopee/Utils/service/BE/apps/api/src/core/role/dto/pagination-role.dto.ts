import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { RoleDto } from './role.dto';

export class RoleItemsDto {
  items: RoleDto[]
}

export class PaginationRoleDto extends IntersectionType(
  RoleItemsDto,
  PaginationDto,
) {}
