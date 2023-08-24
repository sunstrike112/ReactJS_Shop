import { GeneratedGlobalPromotionCodeEntity } from "./global-promotion-code.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";
import { GeneratedBookingEntity } from "./booking.dto";

export class GeneratedPromotionCodeEntity {
  id: number;
  name: string;
  description?: string;
  promoCode: string;
  startDate: Date;
  endDate: Date;
  globalPromotionCode?: GeneratedGlobalPromotionCodeEntity;
  globalPromotionCodeId?: number;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookings: GeneratedBookingEntity[];
}
