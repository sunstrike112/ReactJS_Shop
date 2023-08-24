import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { GlobalPromotionCodeDto } from './global-promotion-code.dto';

export class GlobalPromotionCodeItemsDto {
  items: GlobalPromotionCodeDto[]
}

export class PaginationGlobalPromotionCodeDto extends IntersectionType(
  GlobalPromotionCodeItemsDto,
  PaginationDto,
) {}
