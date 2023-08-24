import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateGlobalPromotionCodeDto } from './create-global-promotion-code.dto';

export class UpdateGlobalPromotionCodeDto extends PartialType(CreateGlobalPromotionCodeDto) {}
