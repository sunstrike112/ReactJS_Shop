import { Test, TestingModule } from '@nestjs/testing';
import { PromotionCodeService } from './promotion-code.service';

describe('PromotionCodeService', () => {
  let service: PromotionCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionCodeService],
    }).compile();

    service = module.get<PromotionCodeService>(PromotionCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
