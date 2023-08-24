import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedGlobalPromotionCodeEntity } from '@generated/global-promotion-code.dto';

export class GlobalPromotionCodeDto extends OmitType(GeneratedGlobalPromotionCodeEntity, [] as const) {}