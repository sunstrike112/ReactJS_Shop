import { Test, TestingModule } from '@nestjs/testing';
import { GeneralEnquiryService } from './general-enquiry.service';

describe('GeneralEnquiryService', () => {
  let service: GeneralEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralEnquiryService],
    }).compile();

    service = module.get<GeneralEnquiryService>(GeneralEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
