import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedServiceEntity } from '@generated/service.dto';

export class CreateServiceDto extends OmitType(GeneratedServiceEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}