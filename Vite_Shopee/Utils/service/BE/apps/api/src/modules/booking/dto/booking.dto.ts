import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedBookingEntity } from '@generated/booking.dto';

export class BookingDto extends OmitType(GeneratedBookingEntity, [] as const) {}