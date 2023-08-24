import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedPackageEntity } from '@generated/package.dto';

export class CreatePackageDto extends OmitType(GeneratedPackageEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}