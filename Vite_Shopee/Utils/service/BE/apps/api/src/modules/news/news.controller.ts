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
  HttpCode,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
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
import { NewsDto } from './dto/news.dto';
import { PaginationNewsDto } from './dto/pagination-news.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { NewsReqInterceptor } from './interceptors/news-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('News')
@ApiBearerAuth()
@Controller('news')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'News Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'News') || ability.can(Action.Create, 'News') || ability.can(Action.Update, 'News')
  )
  async getModelSchema() {
    return this.newsService.getModelSchema(NewsDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create News' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: NewsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'News'))
  @UseInterceptors(new NewsReqInterceptor(NewsDto))
  @UseInterceptors(new TransformDtoInterceptor(NewsDto))
  async create(@Body() createNewsDto: CreateNewsDto, @Req() req) {
    const result = await this.newsService.create(createNewsDto, req);
    this.eventEmitter.emit('news.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List News' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationNewsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'News'))
  @UseInterceptors(new NewsReqInterceptor(NewsDto))
  @UseInterceptors(new TransformDtoInterceptor(NewsDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.newsService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List News (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationNewsDto,
  // })
  // @UseInterceptors(new NewsReqInterceptor(NewsDto))
  // @UseInterceptors(new TransformDtoInterceptor(NewsDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.newsService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail News' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: NewsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'News'))
  @UseInterceptors(new NewsReqInterceptor(NewsDto))
  @UseInterceptors(new TransformDtoInterceptor(NewsDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.newsService.findOne(id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail News' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NewsDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'News'))
  @UseInterceptors(new NewsReqInterceptor(NewsDto))
  @UseInterceptors(new TransformDtoInterceptor(NewsDto))
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto, @Req() req) {
    const result = await this.newsService.update(id, updateNewsDto, req);
    this.eventEmitter.emit('news.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A news' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'News'))
  @UseInterceptors(new NewsReqInterceptor(NewsDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.newsService.remove(+id, req);
    this.eventEmitter.emit('news.deleted', result);
    return result;
  }
}