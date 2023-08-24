import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingAppointmentService } from './booking-appointment.service';
import { RequestBookingAppointmentDto } from './dto/booking-appointment.dto';

@ApiTags('BookingApppointment')
@Controller('booking-appointment')
export class BookingAppointmentController {
  constructor(private readonly bookingAppointmentService: BookingAppointmentService) {}

  @Post('time-slots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list timeslot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list timeslot',
  })
  getTimeSlots(@Body() reqBookingAppointment: RequestBookingAppointmentDto, @Req() req) {
    return this.bookingAppointmentService.getTimeSlots(reqBookingAppointment, req);
  }
}
