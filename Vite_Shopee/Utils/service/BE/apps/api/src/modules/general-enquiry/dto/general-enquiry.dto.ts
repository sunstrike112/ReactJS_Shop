import { IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { GeneratedGeneralEnquiryEntity } from '@generated/general-enquiry.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class GeneralEnquiryDto extends OmitType(
  GeneratedGeneralEnquiryEntity,
  [] as const,
) {
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  postCode?: string;

  @IsString()
  @IsOptional()
  suburb?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  enquiry: string;
}
