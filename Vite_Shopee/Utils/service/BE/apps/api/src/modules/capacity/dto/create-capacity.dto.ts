import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedCapacityEntity } from '@generated/capacity.dto';

export class CreateCapacityDto extends OmitType(GeneratedCapacityEntity, ['createdAt', 'updatedAt'] as const) {
}