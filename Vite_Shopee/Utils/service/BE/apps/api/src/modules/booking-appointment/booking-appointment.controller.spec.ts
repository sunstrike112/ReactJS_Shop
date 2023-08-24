import { Test, TestingModule } from '@nestjs/testing';
import { BookingAppointmentController } from './booking-appointment.controller';
import { BookingAppointmentService } from './booking-appointment.service';

describe('BookingAppointmentController', () => {
  let controller: BookingAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingAppointmentController],
      providers: [BookingAppointmentService],
    }).compile();

    controller = module.get<BookingAppointmentController>(BookingAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
