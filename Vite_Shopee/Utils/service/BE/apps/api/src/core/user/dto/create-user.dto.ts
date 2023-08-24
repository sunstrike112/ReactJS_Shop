import { PartialType, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateNested,
  IsInt,
  IsObject,
  IsBoolean,
  IsArray,
  IsEnum,
  IsEmail,
  IsDefined,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { GeneratedGender } from '@generated/gender.enum';
import { GeneratedProvider } from '@generated/provider.enum';
import { GeneratedUserEntity } from '@generated/user.dto';
import { ManyToManyDto, IsManyToMany } from '@core/crud/dto/schema.dto';
import { MSG_INVALID_STRUCTURE_FORMAT } from '@constants/messages.constant';

export class CreateUserDto extends OmitType(
  GeneratedUserEntity,
  ['news', 'roles', 'userPermissions', 'organizations', 'createdAt', 'updatedAt', 'deletedAt'] as const
) {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(190)
  firstName: string;

  @IsString()
  @MaxLength(190)
  lastName: string;

  @IsOptional()
  @IsEnum(GeneratedProvider)
  provider: GeneratedProvider;

  @IsOptional()
  @IsEnum(GeneratedGender)
  gender: GeneratedGender;

  @IsOptional()
  @IsBoolean()
  isTwoFactorAuthenticationEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @Exclude()
  currentHashedRefreshToken: string;

  @Exclude()
  twoFactorAuthenticationSecret: string;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Validate(IsManyToMany, {
    message: MSG_INVALID_STRUCTURE_FORMAT,
  })
  organizations?: ManyToManyDto;
}