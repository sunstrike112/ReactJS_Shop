import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedServiceEntity } from '@generated/service.dto';

export class ServiceDto extends OmitType(GeneratedServiceEntity, [] as const) {}