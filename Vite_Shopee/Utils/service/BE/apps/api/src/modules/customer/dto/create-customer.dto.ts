import { PartialType, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GeneratedCustomerEntity } from '@generated/customer.dto';
import { GeneratedGender } from '@generated/gender.enum';

export class CreateCustomerDto extends OmitType(
  GeneratedCustomerEntity, 
  ['emailVerifiedAt', 'isActive', 'createdAt', 'updatedAt', 'deletedAt', 'provider', 'isActive', 'currentHashedRefreshToken', 'currentHashedForgotPasswordToken'] as const
) {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  // @MaxLength(20)
  password: string;

  @IsOptional()
  @IsEnum(GeneratedGender)
  gender: GeneratedGender;

  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  postCode: string;
}