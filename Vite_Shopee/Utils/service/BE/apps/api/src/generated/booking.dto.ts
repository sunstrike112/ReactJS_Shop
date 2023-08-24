import { GeneratedCustomerEntity } from "./customer.dto";
import { GeneratedVehicleEntity } from "./vehicle.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";
import { GeneratedPromotionCodeEntity } from "./promotion-code.dto";
import { GeneratedBookingServiceEntity } from "./booking-service.dto";
import { GeneratedBookingStatus } from "./booking-status.enum";

export class GeneratedBookingEntity {
  id: number;
  customer: GeneratedCustomerEntity;
  customerId: number;
  vehicle: GeneratedVehicleEntity;
  vehicleId: number;
  organization: GeneratedOrganizationEntity;
  organizationId: number;
  appointment: Date;
  status: GeneratedBookingStatus;
  isShuttleServiceRequired?: boolean;
  isAfterHoursKeyDropOff?: boolean;
  promotionCode?: GeneratedPromotionCodeEntity;
  promotionCodeId?: number;
  note?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookingServices: GeneratedBookingServiceEntity[];
}
