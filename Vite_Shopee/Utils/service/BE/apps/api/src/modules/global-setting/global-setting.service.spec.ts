import { Test, TestingModule } from '@nestjs/testing';
import { GlobalSettingService } from './global-setting.service';

describe('GlobalSettingService', () => {
  let service: GlobalSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalSettingService],
    }).compile();

    service = module.get< GlobalSettingService >(GlobalSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
