import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { CustomerDto } from './customer.dto';

export class CustomerItemsDto {
  items: CustomerDto[]
}

export class PaginationCustomerDto extends IntersectionType(
  CustomerItemsDto,
  PaginationDto,
) {}
