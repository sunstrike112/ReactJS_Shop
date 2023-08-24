import { GeneratedOrganizationEntity } from "./organization.dto";

export class GeneratedGeneralEnquiryEntity {
  id: number;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  postCode?: string;
  suburb?: string;
  enquiry: string;
  createdAt: Date;
  updatedAt: Date;
}
