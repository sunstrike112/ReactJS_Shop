import { Test, TestingModule } from '@nestjs/testing';
import { GlobalPromotionCodeController } from './global-promotion-code.controller';
import { GlobalPromotionCodeService } from './global-promotion-code.service';

describe('GlobalPromotionCodeController', () => {
  let controller: GlobalPromotionCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalPromotionCodeController],
      providers: [GlobalPromotionCodeService],
    }).compile();

    controller = module.get< GlobalPromotionCodeController >(GlobalPromotionCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
