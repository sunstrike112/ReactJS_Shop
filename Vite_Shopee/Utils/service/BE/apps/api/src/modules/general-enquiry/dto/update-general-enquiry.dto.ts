import { PartialType } from '@nestjs/swagger';
import { CreateGeneralEnquiryDto } from './create-general-enquiry.dto';

export class UpdateGeneralEnquiryDto extends PartialType(
  CreateGeneralEnquiryDto,
) {}
