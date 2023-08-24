import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedResourceEntity } from '@generated/resource.dto';

export class ResourceDto extends OmitType(GeneratedResourceEntity, [] as const) {}