---
to: apps/api/src/<%= type %>/<%= name %>/dto/<%=name%>.dto.ts
---

import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Generated<%= h.changeCase.pascal(Name) %>Entity } from '@generated/<%=name%>.dto';

export class <%= h.changeCase.pascal(Name) %>Dto extends OmitType(Generated<%= h.changeCase.pascal(Name) %>Entity, [] as const) {}