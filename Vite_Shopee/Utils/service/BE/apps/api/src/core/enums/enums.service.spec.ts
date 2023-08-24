import { Test, TestingModule } from '@nestjs/testing';
import { EnumsService } from './enums.service';

describe('EnumsService', () => {
  let service: EnumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnumsService],
    }).compile();

    service = module.get<EnumsService>(EnumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
