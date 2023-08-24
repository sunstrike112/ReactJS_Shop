import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedBookingEntity } from '@generated/booking.dto';

export class CreateBookingDto extends OmitType(GeneratedBookingEntity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}