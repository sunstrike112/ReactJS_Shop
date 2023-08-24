import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedGlobalSettingEntity } from '@generated/global-setting.dto';

export class GlobalSettingDto extends OmitType(GeneratedGlobalSettingEntity, [] as const) {}