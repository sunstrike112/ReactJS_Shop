import { Test, TestingModule } from '@nestjs/testing';
import { GlobalPromotionCodeService } from './global-promotion-code.service';

describe('GlobalPromotionCodeService', () => {
  let service: GlobalPromotionCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalPromotionCodeService],
    }).compile();

    service = module.get< GlobalPromotionCodeService >(GlobalPromotionCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
