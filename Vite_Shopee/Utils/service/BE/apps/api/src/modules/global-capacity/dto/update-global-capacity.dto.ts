import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateGlobalCapacityDto } from './create-global-capacity.dto';

export class UpdateGlobalCapacityDto extends PartialType(CreateGlobalCapacityDto) {}
