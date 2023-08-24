import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { PackageDto } from './package.dto';

export class PackageItemsDto {
  items: PackageDto[]
}

export class PaginationPackageDto extends IntersectionType(
  PackageItemsDto,
  PaginationDto,
) {}
