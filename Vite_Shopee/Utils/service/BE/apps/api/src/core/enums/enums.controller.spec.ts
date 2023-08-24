import { Test, TestingModule } from '@nestjs/testing';
import { EnumsController } from './enums.controller';
import { EnumsService } from './enums.service';

describe('EnumsController', () => {
  let controller: EnumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnumsController],
      providers: [EnumsService],
    }).compile();

    controller = module.get<EnumsController>(EnumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
