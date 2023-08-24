---
to: apps/api/src/<%= type %>/<%= name %>/dto/pagination-<%=name%>.dto.ts
---

import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { <%= h.changeCase.pascal(Name) %>Dto } from './<%=name%>.dto';

export class <%= h.changeCase.pascal(Name) %>ItemsDto {
  items: <%= h.changeCase.pascal(Name) %>Dto[]
}

export class Pagination<%= h.changeCase.pascal(Name) %>Dto extends IntersectionType(
  <%= h.changeCase.pascal(Name) %>ItemsDto,
  PaginationDto,
) {}
