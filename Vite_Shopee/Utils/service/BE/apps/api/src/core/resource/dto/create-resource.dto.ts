import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedResourceEntity } from '@generated/resource.dto';

export class CreateResourceDto extends OmitType(GeneratedResourceEntity, [] as const) {
}