import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedPackageEntity } from '@generated/package.dto';

export class PackageDto extends OmitType(GeneratedPackageEntity, [] as const) {}