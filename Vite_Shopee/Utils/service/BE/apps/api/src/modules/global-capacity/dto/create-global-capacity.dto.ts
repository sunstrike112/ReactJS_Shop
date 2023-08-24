import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedGlobalCapacityEntity } from '@generated/global-capacity.dto';

export class CreateGlobalCapacityDto extends OmitType(GeneratedGlobalCapacityEntity, ['createdAt', 'updatedAt'] as const) {
}