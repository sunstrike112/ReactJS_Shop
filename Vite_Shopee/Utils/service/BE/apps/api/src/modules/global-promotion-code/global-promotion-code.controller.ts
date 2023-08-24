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
import { GlobalPromotionCodeService } from './global-promotion-code.service';
import { CreateGlobalPromotionCodeDto } from './dto/create-global-promotion-code.dto';
import { UpdateGlobalPromotionCodeDto } from './dto/update-global-promotion-code.dto';
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
import { GlobalPromotionCodeDto } from './dto/global-promotion-code.dto';
import { PaginationGlobalPromotionCodeDto } from './dto/pagination-global-promotion-code.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { GlobalPromotionCodeReqInterceptor } from './interceptors/global-promotion-code-req.interceptor';
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';

@ApiTags('GlobalPromotionCodes')
@ApiBearerAuth()
@Controller('global-promotion-codes')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class GlobalPromotionCodeController {
  constructor(
    private readonly globalPromotionCodeService: GlobalPromotionCodeService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'GlobalPromotionCode Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'GlobalPromotionCode') || ability.can(Action.Create, 'GlobalPromotionCode') || ability.can(Action.Update, 'GlobalPromotionCode')
  )
  async getModelSchema() {
    return this.globalPromotionCodeService.getModelSchema(GlobalPromotionCodeDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create GlobalPromotionCode' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GlobalPromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'GlobalPromotionCode'))
  @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalPromotionCodeDto))
  async create(@Body() createGlobalPromotionCodeDto: CreateGlobalPromotionCodeDto, @Req() req) {
    const result = await this.globalPromotionCodeService.create(createGlobalPromotionCodeDto, req);
    this.eventEmitter.emit('global-promotion-codes.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List GlobalPromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationGlobalPromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalPromotionCode'))
  @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalPromotionCodeDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.globalPromotionCodeService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List GlobalPromotionCode (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationGlobalPromotionCodeDto,
  // })
  // @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  // @UseInterceptors(new TransformDtoInterceptor(GlobalPromotionCodeDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.globalPromotionCodeService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail GlobalPromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GlobalPromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'GlobalPromotionCode'))
  @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalPromotionCodeDto))
  findOne(@Param('id') id: string, @Body() onlySelectDto: OnlySelectDto, @Req() req) {
    return this.globalPromotionCodeService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail GlobalPromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GlobalPromotionCodeDto
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'GlobalPromotionCode'))
  @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(GlobalPromotionCodeDto))
  async update(@Param('id') id: string, @Body() updateGlobalPromotionCodeDto: UpdateGlobalPromotionCodeDto, @Req() req) {
    const result = await this.globalPromotionCodeService.update(+id, updateGlobalPromotionCodeDto, req);
    this.eventEmitter.emit('global-promotion-codes.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A global-promotion-code' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.'
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'GlobalPromotionCode'))
  @UseInterceptors(new GlobalPromotionCodeReqInterceptor(GlobalPromotionCodeDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.globalPromotionCodeService.remove(+id, req);
    this.eventEmitter.emit('global-promotion-codes.deleted', result);
    return result;
  }
}