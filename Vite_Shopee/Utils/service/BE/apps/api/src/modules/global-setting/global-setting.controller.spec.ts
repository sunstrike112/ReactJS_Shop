import { Test, TestingModule } from '@nestjs/testing';
import { GlobalSettingController } from './global-setting.controller';
import { GlobalSettingService } from './global-setting.service';

describe('GlobalSettingController', () => {
  let controller: GlobalSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalSettingController],
      providers: [GlobalSettingService],
    }).compile();

    controller = module.get< GlobalSettingController >(GlobalSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
