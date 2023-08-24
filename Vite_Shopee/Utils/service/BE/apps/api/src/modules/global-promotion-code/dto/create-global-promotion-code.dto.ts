import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedGlobalPromotionCodeEntity } from '@generated/global-promotion-code.dto';

export class CreateGlobalPromotionCodeDto extends OmitType(GeneratedGlobalPromotionCodeEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}