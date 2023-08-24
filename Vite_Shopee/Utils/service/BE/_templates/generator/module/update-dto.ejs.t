---
to: apps/api/src/<%= type %>/<%= name %>/dto/update-<%=name%>.dto.ts
---

import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { Create<%= h.changeCase.pascal(Name) %>Dto } from './create-<%=name%>.dto';

export class Update<%= h.changeCase.pascal(Name) %>Dto extends PartialType(Create<%= h.changeCase.pascal(Name) %>Dto) {}
