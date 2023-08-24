---
to: apps/api/src/<%= type %>/<%= name %>/dto/create-<%=name%>.dto.ts
---

import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { Generated<%= h.changeCase.pascal(Name) %>Entity } from '@generated/<%=name%>.dto';

export class Create<%= h.changeCase.pascal(Name) %>Dto extends OmitType(Generated<%= h.changeCase.pascal(Name) %>Entity, ['createdAt', 'updatedAt', 'deletedAt'] as const) {
}