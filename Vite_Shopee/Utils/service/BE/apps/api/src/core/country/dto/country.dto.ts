import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';

export class TimezonesDto {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export class CountryDto {
  name: string;
  phonecode: string;
  isoCode: string;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones?: TimezonesDto[];
}

export class CountryItemsDto {
  items: CountryDto[]
}

export class StateDto {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude?: string | null;
  longitude?: string | null;
}

export class StateItemsDto {
  items: StateDto[]
}

export class CityDto {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string | null;
  longitude?: string | null;
}

export class CityItemsDto {
  items: CityDto[]
}