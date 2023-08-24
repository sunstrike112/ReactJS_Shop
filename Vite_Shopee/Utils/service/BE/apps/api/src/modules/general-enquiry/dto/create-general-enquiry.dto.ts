import { OmitType } from '@nestjs/swagger';
import { GeneralEnquiryDto } from './general-enquiry.dto';

export class CreateGeneralEnquiryDto extends OmitType(GeneralEnquiryDto, [
  'createdAt',
  'updatedAt',
] as const) {}
