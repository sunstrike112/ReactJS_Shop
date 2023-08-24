import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { ResourceDto } from './resource.dto';

export class ResourceItemsDto {
  items: ResourceDto[]
}

export class PaginationResourceDto extends IntersectionType(
  ResourceItemsDto,
  PaginationDto,
) {}
