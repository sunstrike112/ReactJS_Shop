---
to: apps/api/src/<%= type %>/<%= name %>/<%=name%>.controller.spec.ts
---

import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.changeCase.pascal(Name) %>Controller } from './<%=name%>.controller';
import { <%= h.changeCase.pascal(Name) %>Service } from './<%=name%>.service';

describe('<%= h.changeCase.pascal(Name) %>Controller', () => {
  let controller: <%= h.changeCase.pascal(Name) %>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= h.changeCase.pascal(Name) %>Controller],
      providers: [<%= h.changeCase.pascal(Name) %>Service],
    }).compile();

    controller = module.get< <%= h.changeCase.pascal(Name) %>Controller >(<%= h.changeCase.pascal(Name) %>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
