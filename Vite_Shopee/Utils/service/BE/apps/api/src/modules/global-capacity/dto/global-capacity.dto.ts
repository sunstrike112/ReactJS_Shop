import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedGlobalCapacityEntity } from '@generated/global-capacity.dto';

export class GlobalCapacityDto extends OmitType(GeneratedGlobalCapacityEntity, [] as const) {}