import { IsNotEmpty, IsNumber, IsEmail, MaxLength } from 'class-validator';
import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Exclude()
  email: string;

  @Exclude()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  newPassword: string
}

export class UpdateVehicleStatusDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class CheckEmailExistsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}