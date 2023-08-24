import { Test, TestingModule } from '@nestjs/testing';
import { GlobalCapacityService } from './global-capacity.service';

describe('GlobalCapacityService', () => {
  let service: GlobalCapacityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalCapacityService],
    }).compile();

    service = module.get< GlobalCapacityService >(GlobalCapacityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
