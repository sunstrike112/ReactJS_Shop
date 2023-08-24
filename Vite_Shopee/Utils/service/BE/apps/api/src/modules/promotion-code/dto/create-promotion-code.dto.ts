import { OmitType } from '@nestjs/swagger';
import { GeneratedPromotionCodeEntity } from '@generated/promotion-code.dto';

export class CreatePromotionCodeDto extends OmitType(
  GeneratedPromotionCodeEntity,
  ['createdAt', 'updatedAt', 'deletedAt'] as const,
) {}
