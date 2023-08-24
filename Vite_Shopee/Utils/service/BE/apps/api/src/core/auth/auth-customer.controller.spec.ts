import { Test, TestingModule } from '@nestjs/testing';
import { AuthCustomerController } from './auth-customer.controller';
import { AuthCustomerService } from './auth-customer.service';

describe('AuthCustomerController', () => {
  let controller: AuthCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthCustomerController],
      providers: [AuthCustomerService],
    }).compile();

    controller = module.get<AuthCustomerController>(AuthCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
