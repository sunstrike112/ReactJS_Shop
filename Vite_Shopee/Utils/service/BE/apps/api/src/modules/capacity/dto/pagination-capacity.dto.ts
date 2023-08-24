import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { CapacityDto } from './capacity.dto';

export class CapacityItemsDto {
  items: CapacityDto[]
}

export class PaginationCapacityDto extends IntersectionType(
  CapacityItemsDto,
  PaginationDto,
) {}
