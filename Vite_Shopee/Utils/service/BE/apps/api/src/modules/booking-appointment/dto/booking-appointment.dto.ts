import { IsBoolean, IsString, IsArray, ArrayNotEmpty } from "class-validator";

export class BookingAppointmentDto {
  @IsString()
  time: string;

  @IsBoolean()
  isAvailable: boolean;
}

export class RequestBookingAppointmentDto {
  @IsString()
  date: Date;

  @IsArray()
  @ArrayNotEmpty()
  packageIds: number[];
}