import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedVehicleEntity } from '@generated/vehicle.dto';

export class CreateVehicleDto extends OmitType(GeneratedVehicleEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}