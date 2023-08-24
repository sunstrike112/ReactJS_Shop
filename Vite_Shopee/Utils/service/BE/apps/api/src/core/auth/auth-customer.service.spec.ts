import { Test, TestingModule } from '@nestjs/testing';
import { AuthCustomerService } from './auth-customer.service';

describe('AuthCustomerService', () => {
  let service: AuthCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCustomerService],
    }).compile();

    service = module.get<AuthCustomerService>(AuthCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
