import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { GeneralEnquiryDto } from './general-enquiry.dto';

export class GeneralEnquiryItemsDto {
  items: GeneralEnquiryDto[];
}

export class PaginationGeneralEnquiryDto extends IntersectionType(
  GeneralEnquiryItemsDto,
  PaginationDto,
) {}
