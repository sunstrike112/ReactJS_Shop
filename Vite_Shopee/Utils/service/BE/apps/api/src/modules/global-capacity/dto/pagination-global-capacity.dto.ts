import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { GlobalCapacityDto } from './global-capacity.dto';

export class GlobalCapacityItemsDto {
  items: GlobalCapacityDto[]
}

export class PaginationGlobalCapacityDto extends IntersectionType(
  GlobalCapacityItemsDto,
  PaginationDto,
) {}
