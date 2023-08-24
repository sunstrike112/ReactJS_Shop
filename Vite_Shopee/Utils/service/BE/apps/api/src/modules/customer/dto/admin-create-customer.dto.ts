import { PartialType, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GeneratedCustomerEntity } from '@generated/customer.dto';
import { GeneratedGender } from '@generated/gender.enum';

export class AdminCreateCustomerDto extends OmitType(
  GeneratedCustomerEntity, 
  ['emailVerifiedAt', 'isActive', 'createdAt', 'updatedAt', 'deletedAt', 'provider', 'isActive', 'currentHashedRefreshToken', 'currentHashedForgotPasswordToken'] as const
) {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(190)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(190)
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(GeneratedGender)
  gender: GeneratedGender;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  postCode: string;
}