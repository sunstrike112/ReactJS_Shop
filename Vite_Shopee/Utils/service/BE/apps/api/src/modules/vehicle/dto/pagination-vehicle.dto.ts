import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { VehicleDto } from './vehicle.dto';

export class VehicleItemsDto {
  items: VehicleDto[]
}

export class PaginationVehicleDto extends IntersectionType(
  VehicleItemsDto,
  PaginationDto,
) {}
