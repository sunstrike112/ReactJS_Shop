import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
