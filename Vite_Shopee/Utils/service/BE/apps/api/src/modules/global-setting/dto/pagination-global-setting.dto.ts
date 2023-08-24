import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { GlobalSettingDto } from './global-setting.dto';

export class GlobalSettingItemsDto {
  items: GlobalSettingDto[]
}

export class PaginationGlobalSettingDto extends IntersectionType(
  GlobalSettingItemsDto,
  PaginationDto,
) {}
