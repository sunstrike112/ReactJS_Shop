import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { ServiceDto } from './service.dto';

export class ServiceItemsDto {
  items: ServiceDto[]
}

export class PaginationServiceDto extends IntersectionType(
  ServiceItemsDto,
  PaginationDto,
) {}
