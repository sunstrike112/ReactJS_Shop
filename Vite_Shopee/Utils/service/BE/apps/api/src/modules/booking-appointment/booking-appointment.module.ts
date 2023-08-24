import { Module } from '@nestjs/common';
import { BookingAppointmentService } from './booking-appointment.service';
import { BookingAppointmentController } from './booking-appointment.controller';
import { OrganizationModule } from '@core/organization/organization.module';
import { GlobalCapacityModule } from '@modules/global-capacity/global-capacity.module';
import { PackageModule } from '@modules/package/package.module';

@Module({
  controllers: [BookingAppointmentController],
  providers: [BookingAppointmentService],
  imports: [
    OrganizationModule,
    GlobalCapacityModule,
    PackageModule
  ]
})
export class BookingAppointmentModule {}
