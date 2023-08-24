import { Test, TestingModule } from '@nestjs/testing';
import { BookingAppointmentService } from './booking-appointment.service';

describe('BookingAppointmentService', () => {
  let service: BookingAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingAppointmentService],
    }).compile();

    service = module.get<BookingAppointmentService>(BookingAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
