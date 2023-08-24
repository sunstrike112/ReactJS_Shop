import { GeneratedServiceEntity } from "./service.dto";
import { GeneratedBookingEntity } from "./booking.dto";
import { GeneratedBookingPackageEntity } from "./booking-package.dto";

export class GeneratedBookingServiceEntity {
  id: number;
  note?: string;
  service: GeneratedServiceEntity;
  serviceId: number;
  booking: GeneratedBookingEntity;
  bookingId: number;
  bookingPackages: GeneratedBookingPackageEntity[];
}
