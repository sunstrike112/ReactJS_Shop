import { GeneratedBookingServiceEntity } from "./booking-service.dto";
import { GeneratedPackageEntity } from "./package.dto";

export class GeneratedBookingPackageEntity {
  id: number;
  bookingService: GeneratedBookingServiceEntity;
  bookingServiceId: number;
  package: GeneratedPackageEntity;
  packageId: number;
}
