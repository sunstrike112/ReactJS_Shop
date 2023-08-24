import { Test, TestingModule } from '@nestjs/testing';
import { PromotionCodeController } from './promotion-code.controller';
import { PromotionCodeService } from './promotion-code.service';

describe('PromotionCodeController', () => {
  let controller: PromotionCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionCodeController],
      providers: [PromotionCodeService],
    }).compile();

    controller = module.get<PromotionCodeController>(PromotionCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
