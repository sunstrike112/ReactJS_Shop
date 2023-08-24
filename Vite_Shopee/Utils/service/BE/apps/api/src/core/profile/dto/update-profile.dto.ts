import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
// import { CreateProfileDto } from './create-profile.dto';
import { GeneratedUserEntity } from '@generated/user.dto';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { GeneratedGender } from '@generated/gender.enum';
import { GeneratedProvider } from '@generated/provider.enum';

export class CreateProfileDto extends OmitType(GeneratedUserEntity, [
  'roles',
  'news',
  'password',
  'userPermissions',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

  @Exclude()
  email: string

  @IsString()
  @MinLength(4)
  @MaxLength(190)
  firstName: string;

  @IsString()
  @MaxLength(190)
  lastName: string;
  
  @IsEnum(GeneratedProvider)
  provider: GeneratedProvider

  @IsEnum(GeneratedGender)
  gender: GeneratedGender

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsBoolean()
  isTwoFactorAuthenticationEnabled: boolean

  @IsBoolean()
  isActive: boolean

  @Exclude()
  password: string

  @Exclude()
  currentHashedRefreshToken: string

  @Exclude()
  twoFactorAuthenticationSecret: string
}

export class UpdatePasswordDto {
  @IsString()
  password: string

  @IsString()
  @MinLength(6)
  newPassword: string
}