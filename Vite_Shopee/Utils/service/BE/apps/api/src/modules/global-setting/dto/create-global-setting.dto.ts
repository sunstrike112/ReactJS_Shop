import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedGlobalSettingEntity } from '@generated/global-setting.dto';

export class CreateGlobalSettingDto extends OmitType(GeneratedGlobalSettingEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}