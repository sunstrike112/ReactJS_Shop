---
to: apps/api/src/<%= type %>/<%= name %>/<%=name%>.controller.ts
---

import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheKey,
  CacheTTL,
  UseGuards,
  ExecutionContext,
  HttpCode,
} from '@nestjs/common';
import { <%= h.changeCase.pascal(Name) %>Service } from './<%= name %>.service';
import { Create<%= h.changeCase.pascal(Name) %>Dto } from './dto/create-<%= name %>.dto';
import { Update<%= h.changeCase.pascal(Name) %>Dto } from './dto/update-<%= name %>.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaDto, FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { <%= h.changeCase.pascal(Name) %>Dto } from './dto/<%= name %>.dto';
import { Pagination<%= h.changeCase.pascal(Name) %>Dto } from './dto/pagination-<%=name%>.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { <%= h.changeCase.pascal(Name) %>ReqInterceptor } from './interceptors/<%=name%>-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('<%= h.changeCase.pascal(h.inflection.pluralize(name)) %>')
@ApiBearerAuth()
@Controller('<%= h.inflection.pluralize(name) %>')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class <%= h.changeCase.pascal(Name) %>Controller {
  constructor(
    private readonly <%= h.changeCase.camel(name) %>Service: <%= h.changeCase.pascal(Name) %>Service,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: '<%= h.changeCase.pascal(Name) %> Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, '<%= h.changeCase.pascal(name) %>') || ability.can(Action.Create, '<%= h.changeCase.pascal(name) %>') || ability.can(Action.Update, '<%= h.changeCase.pascal(name) %>')
  )
  async getModelSchema() {
    return this.<%= h.changeCase.camel(name) %>Service.getModelSchema(<%= h.changeCase.pascal(Name) %>Dto);
  }

  @Post()
  @ApiOperation({ summary: 'Create <%= h.changeCase.pascal(Name) %>' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: <%= h.changeCase.pascal(Name) %>Dto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, '<%= h.changeCase.pascal(name) %>'))
  @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  @UseInterceptors(new TransformDtoInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  async create(@Body() create<%= h.changeCase.pascal(Name) %>Dto: Create<%= h.changeCase.pascal(Name) %>Dto, @Req() req) {
    const result = await this.<%= h.changeCase.camel(name) %>Service.create(create<%= h.changeCase.pascal(Name) %>Dto, req);
    this.eventEmitter.emit('<%= h.inflection.pluralize(name) %>.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List <%= h.changeCase.pascal(Name) %>' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Pagination<%= h.changeCase.pascal(Name) %>Dto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, '<%= h.changeCase.pascal(name) %>'))
  @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  @UseInterceptors(new TransformDtoInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.<%= h.changeCase.camel(name) %>Service.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List <%= h.changeCase.pascal(Name) %> (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: Pagination<%= h.changeCase.pascal(Name) %>Dto,
  // })
  // @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  // @UseInterceptors(new TransformDtoInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.<%= h.changeCase.camel(name) %>Service.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail <%= h.changeCase.pascal(Name) %>' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: <%= h.changeCase.pascal(Name) %>Dto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, '<%= h.changeCase.pascal(name) %>'))
  @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  @UseInterceptors(new TransformDtoInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.<%= h.changeCase.camel(name) %>Service.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail <%= h.changeCase.pascal(Name) %>' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: <%= h.changeCase.pascal(Name) %>Dto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, '<%= h.changeCase.pascal(name) %>'))
  @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  @UseInterceptors(new TransformDtoInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  async update(@Param('id') id: string, @Body() update<%= h.changeCase.pascal(Name) %>Dto: Update<%= h.changeCase.pascal(Name) %>Dto, @Req() req) {
    const result = await this.<%= h.changeCase.camel(name) %>Service.update(+id, update<%= h.changeCase.pascal(Name) %>Dto, req);
    this.eventEmitter.emit('<%= h.inflection.pluralize(name) %>.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A <%= name %>' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, '<%= h.changeCase.pascal(name) %>'))
  @UseInterceptors(new <%= h.changeCase.pascal(Name) %>ReqInterceptor(<%= h.changeCase.pascal(Name) %>Dto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.<%= h.changeCase.camel(name) %>Service.remove(+id, req);
    this.eventEmitter.emit('<%= h.inflection.pluralize(name) %>.deleted', result);
    return result;
  }
}