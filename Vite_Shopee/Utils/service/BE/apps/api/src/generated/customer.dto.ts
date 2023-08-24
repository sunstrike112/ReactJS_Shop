import { GeneratedBookingEntity } from "./booking.dto";
import { GeneratedVehicleEntity } from "./vehicle.dto";
import { GeneratedProvider } from "./provider.enum";
import { GeneratedGender } from "./gender.enum";

export class GeneratedCustomerEntity {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  suburb?: string;
  postCode?: string;
  nrma?: string;
  companyName?: string;
  password?: string;
  provider?: GeneratedProvider;
  gender?: GeneratedGender;
  currentHashedRefreshToken?: string;
  currentHashedForgotPasswordToken?: string;
  emailVerifiedAt?: Date;
  note?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookings: GeneratedBookingEntity[];
  vehicles: GeneratedVehicleEntity[];
}
