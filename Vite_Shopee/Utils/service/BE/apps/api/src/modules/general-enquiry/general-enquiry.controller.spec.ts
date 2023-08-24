import { Test, TestingModule } from '@nestjs/testing';
import { GeneralEnquiryController } from './general-enquiry.controller';
import { GeneralEnquiryService } from './general-enquiry.service';

describe('GeneralEnquiryController', () => {
  let controller: GeneralEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralEnquiryController],
      providers: [GeneralEnquiryService],
    }).compile();

    controller = module.get<GeneralEnquiryController>(
      GeneralEnquiryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
