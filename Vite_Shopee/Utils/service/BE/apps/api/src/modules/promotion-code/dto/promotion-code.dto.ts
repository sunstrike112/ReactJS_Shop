import { OmitType } from '@nestjs/swagger';
import { GeneratedPromotionCodeEntity } from '@generated/promotion-code.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class PromotionCodeDto extends OmitType(
  GeneratedPromotionCodeEntity,
  [] as const,
) {}

export class ValidPromoCodeDto {
  @IsNotEmpty()
  @MaxLength(10)
  promoCode: string;
}
