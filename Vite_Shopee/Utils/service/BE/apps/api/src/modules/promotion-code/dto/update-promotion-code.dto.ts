import { PartialType } from '@nestjs/swagger';
import { CreatePromotionCodeDto } from './create-promotion-code.dto';

export class UpdatePromotionCodeDto extends PartialType(
  CreatePromotionCodeDto,
) {}
