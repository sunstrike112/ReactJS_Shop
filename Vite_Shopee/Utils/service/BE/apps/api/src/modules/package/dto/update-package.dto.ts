import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { CreatePackageDto } from './create-package.dto';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
