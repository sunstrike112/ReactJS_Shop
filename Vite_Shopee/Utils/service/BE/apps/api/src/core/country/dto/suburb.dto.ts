import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { GeneratedSuburbEntity } from '@generated/suburb.dto';

export class SuburbDto extends OmitType(GeneratedSuburbEntity, ['urbanArea', 'stateSuburbCode'] as const) {}

class SuburbMetaDataDto {
  stateIsoCode: string;
  stateName: string;
  countryCode: string;
  countryName: string;
}

export class SuburbItemsDto {
  items: SuburbDto[];
  metadata: SuburbMetaDataDto;
}