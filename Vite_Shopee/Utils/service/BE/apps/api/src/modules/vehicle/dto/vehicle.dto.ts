import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedVehicleEntity } from '@generated/vehicle.dto';

export class VehicleDto extends OmitType(GeneratedVehicleEntity, [] as const) {}