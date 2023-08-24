---
to: apps/api/src/<%= type %>/<%= name %>/<%=name%>.service.spec.ts
---

import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.changeCase.pascal(Name) %>Service } from './<%=name%>.service';

describe('<%= h.changeCase.pascal(Name) %>Service', () => {
  let service: <%= h.changeCase.pascal(Name) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= h.changeCase.pascal(Name) %>Service],
    }).compile();

    service = module.get< <%= h.changeCase.pascal(Name) %>Service >(<%= h.changeCase.pascal(Name) %>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
