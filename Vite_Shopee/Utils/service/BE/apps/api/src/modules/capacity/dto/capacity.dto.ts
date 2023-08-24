import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedCapacityEntity } from '@generated/capacity.dto';

export class CapacityDto extends OmitType(GeneratedCapacityEntity, [] as const) {}