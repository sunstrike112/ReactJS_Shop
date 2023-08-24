import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { PromotionCodeDto } from './promotion-code.dto';

export class PromotionCodeItemsDto {
  items: PromotionCodeDto[];
}

export class PaginationPromotionCodeDto extends IntersectionType(
  PromotionCodeItemsDto,
  PaginationDto,
) {}
