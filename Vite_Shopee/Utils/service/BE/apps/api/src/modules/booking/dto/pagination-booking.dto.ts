import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { BookingDto } from './booking.dto';

export class BookingItemsDto {
  items: BookingDto[]
}

export class PaginationBookingDto extends IntersectionType(
  BookingItemsDto,
  PaginationDto,
) {}
