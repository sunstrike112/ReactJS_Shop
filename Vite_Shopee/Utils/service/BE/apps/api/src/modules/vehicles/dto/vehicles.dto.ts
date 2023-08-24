import { IsBoolean, IsDate, IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class VehicleDto {
  @IsString()
  id: string;
  
  @IsString()
  redbookCode: string;

  @IsString()
  makeCode: string;

  @IsString()
  make: string;

  @IsString()
  modelCode: string;

  @IsString()
  model: string;

  @IsString()
  description: string;

  @IsString()
  vin: string;

  @IsNumber()
  manufacturedYear: number;

  @IsNumber()
  manufacturedMonth: number;

  @IsString()
  colour: string;

  @IsDate()
  registrationExpiryDate: Date;

  @IsString()
  complianceYearMonth: string;

  @IsString()
  bodyStyle: string;

  @IsString()
  vehicleType: string;

  @IsString()
  engineNumber: string;

  @IsString()
  registrationStatus: string;

  @IsBoolean()
  isBestMatch: boolean;
}

export class VehicleManualDto {
  @IsString()
  id: string;

  @IsString()
  series: string;

  @IsString()
  transmission:string;

  @IsString()
  bodyType: string;

  @IsString()
  vinNumber: string;

  @IsString()
  make: string;

  @IsString()
  family: string;

  @IsString()
  variant: string;

  @IsString()
  year: string
}

export class VehicleDetailDto {
  @IsString()
  id: string;

  @IsNumber()
  year: number;

  @IsNumber()
  month: number;

  @IsString()
  bodyType: string;

  @IsString()
  transmission: string;

  @IsString()
  engineSize: string;

  @IsString()
  engineCapacity: string;

  @IsString()
  cylinder: string;

  @IsString()
  engine: string;

  @IsNumber()
  retailPrice: number;

  @IsNumber()
  belowPrice: number;

  @IsNumber()
  abovePrice: number;

  @IsString()
  make: string;

  @IsString()
  family: string;

  @IsString()
  variant: string
}

export class SearchVehicleManualDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  family: string;

  @IsString()
  @IsNotEmpty()
  variant: string;

  @IsString()
  @IsNotEmpty()
  year: string;
}

export class SearchVehicleRegoDto {
  @IsString()
  @IsNotEmpty()
  rego: string;

  @IsString()
  @IsNotEmpty()
  state: string;
  
  @IsBoolean()
  @IsOptional()
  includeAgeRegistrationStatus?: boolean

  @IsBoolean()
  @IsOptional()
  includeNDVIN?: boolean

  @IsBoolean()
  @IsOptional()
  includeNDVehData?: boolean

  @IsBoolean()
  @IsOptional()
  includeNDAge?: boolean

  @IsBoolean()
  @IsOptional()
  includeNDRegistrationStatus?: boolean

  @IsBoolean()
  @IsOptional()
  includeVIN?: boolean

  @IsBoolean()
  @IsOptional()
  includeExtendedData?: boolean
}

export class SearchVehicleModelsDto {
  @IsString()
  @IsNotEmpty()
  make: string;
}

export class SearchVehicleVariantsDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  family: string;
}

export class SearchVehicleYearsDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  family: string;

  @IsString()
  @IsNotEmpty()
  variant: string;
}