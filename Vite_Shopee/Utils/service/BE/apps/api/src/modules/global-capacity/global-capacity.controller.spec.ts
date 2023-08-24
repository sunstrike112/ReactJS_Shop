import { Test, TestingModule } from '@nestjs/testing';
import { GlobalCapacityController } from './global-capacity.controller';
import { GlobalCapacityService } from './global-capacity.service';

describe('GlobalCapacityController', () => {
  let controller: GlobalCapacityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalCapacityController],
      providers: [GlobalCapacityService],
    }).compile();

    controller = module.get< GlobalCapacityController >(GlobalCapacityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
