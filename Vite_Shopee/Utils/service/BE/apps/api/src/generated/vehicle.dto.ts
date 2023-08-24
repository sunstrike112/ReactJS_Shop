import { GeneratedCustomerEntity } from "./customer.dto";
import { GeneratedBookingEntity } from "./booking.dto";

export class GeneratedVehicleEntity {
  id: number;
  slId?: string;
  rego: string;
  state: string;
  make: string;
  model: string;
  variant?: string;
  year?: number;
  color?: string;
  transmission?: string;
  cylinder?: string;
  customer: GeneratedCustomerEntity;
  customerId: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookings: GeneratedBookingEntity[];
}
