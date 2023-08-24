import { Test, TestingModule } from '@nestjs/testing';
import { CapacityController } from './capacity.controller';
import { CapacityService } from './capacity.service';

describe('CapacityController', () => {
  let controller: CapacityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapacityController],
      providers: [CapacityService],
    }).compile();

    controller = module.get< CapacityController >(CapacityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
