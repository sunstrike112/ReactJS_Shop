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
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PromotionCodeService } from './promotion-code.service';
import { CreatePromotionCodeDto } from './dto/create-promotion-code.dto';
import { UpdatePromotionCodeDto } from './dto/update-promotion-code.dto';
import { FindAllDto, OnlySelectDto } from '@crud/dto/find-all.dto';
import { FieldSchemaItemsDto } from '@crud/dto/schema.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PromotionCodeDto, ValidPromoCodeDto } from './dto/promotion-code.dto';
import { PaginationPromotionCodeDto } from './dto/pagination-promotion-code.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { PromotionCodeReqInterceptor } from './interceptors/promotion-code-req.interceptor';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '@core/casl/guards/policies.guard';
import { CheckPolicies } from '@core/casl/decorators/check-policies.decorator';
import { AppAbility } from '@core/casl/casl-ability.factory';
import { Action } from '@core/casl/enums/action.enum';
import {
  MSG_NOT_FOUND_PROMO_CODE,
  MSG_IN_ACTIVE_PROMO_CODE,
  MSG_EXPIRED_PROMO_CODE,
  MSG_ACTIVE_PROMO_CODE,
} from '@constants/messages.constant';

@ApiTags('PromotionCodes')
@ApiBearerAuth()
@Controller('promotion-codes')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class PromotionCodeController {
  constructor(
    private readonly promotionCodeService: PromotionCodeService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('schema')
  @ApiOperation({ summary: 'PromotionCode Schema' })
  @ApiResponse({
    status: 200,
    description: 'The model schema',
    type: FieldSchemaItemsDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(Action.Read, 'PromotionCode') ||
      ability.can(Action.Create, 'PromotionCode') ||
      ability.can(Action.Update, 'PromotionCode'),
  )
  async getModelSchema() {
    return this.promotionCodeService.getModelSchema(PromotionCodeDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create PromotionCode' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: PromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, 'PromotionCode'),
  )
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(PromotionCodeDto))
  async create(
    @Body() createPromotionCodeDto: CreatePromotionCodeDto,
    @Req() req,
  ) {
    const result = await this.promotionCodeService.create(
      createPromotionCodeDto,
      req,
    );
    this.eventEmitter.emit('promotion-codes.created', result);
    return result;
  }

  @Post('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'List PromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PaginationPromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Read, 'PromotionCode'),
  )
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(PromotionCodeDto))
  findAll(@Body() findAllDto: FindAllDto, @Req() req) {
    return this.promotionCodeService.findAll(findAllDto, false, req);
  }

  // @Get('include-trashed')
  // @ApiOperation({ summary: 'List PromotionCode (With Trashed)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: PaginationPromotionCodeDto,
  // })
  // @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  // @UseInterceptors(new TransformDtoInterceptor(PromotionCodeDto))
  // findAllWithTrashed(@Body() findAllDto: FindAllDto) {
  //   return this.promotionCodeService.findAll(findAllDto, true);
  // }

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detail PromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Read, 'PromotionCode'),
  )
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(PromotionCodeDto))
  findOne(
    @Param('id') id: string,
    @Body() onlySelectDto: OnlySelectDto,
    @Req() req,
  ) {
    return this.promotionCodeService.findOne(+id, onlySelectDto, false, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Detail PromotionCode' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PromotionCodeDto,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, 'PromotionCode'),
  )
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  @UseInterceptors(new TransformDtoInterceptor(PromotionCodeDto))
  async update(
    @Param('id') id: string,
    @Body() updatePromotionCodeDto: UpdatePromotionCodeDto,
    @Req() req,
  ) {
    const result = await this.promotionCodeService.update(
      +id,
      updatePromotionCodeDto,
      req,
    );
    this.eventEmitter.emit('promotion-codes.updated', result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A promotion-code' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, 'PromotionCode'),
  )
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.promotionCodeService.remove(+id, req);
    this.eventEmitter.emit('promotion-codes.deleted', result);
    return result;
  }

  @Get('check-valid-promoCode/:promoCode')
  @ApiOperation({ summary: 'Check promotion code exists' })
  @ApiResponse({
    status: 204,
    description: 'Check promotion code exists.',
  })
  @UseInterceptors(new PromotionCodeReqInterceptor(PromotionCodeDto))
  async checkPromotionCodeExists(
    @Param() params: ValidPromoCodeDto,
    @Req() req,
  ) {
    const organizationId = parseInt(req.headers['x-organization-id'], 10);
    const promoCode: any =
      await this.promotionCodeService.checkPromotionCodeExists(
        params.promoCode,
        organizationId,
      );

    if (!promoCode) {
      return {
        statusCode: HttpStatus.OK,
        status: 'notFound',
        message: MSG_NOT_FOUND_PROMO_CODE,
      };
    }
    if (!promoCode.isActive) {
      return {
        statusCode: HttpStatus.OK,
        status: 'inActive',
        message: MSG_IN_ACTIVE_PROMO_CODE,
      };
    }

    if (
      !moment
        .tz(promoCode.organization.timezone)
        .isBetween(
          moment.tz(promoCode.startDate, promoCode.organization.timezone),
          moment.tz(promoCode.endDate, promoCode.organization.timezone),
          undefined,
          '[]'
        )
    ) {
      return {
        statusCode: HttpStatus.OK,
        status: 'expired',
        message: MSG_EXPIRED_PROMO_CODE,
      };
    }

    return {
      promoCodeId: promoCode.id,
      statusCode: HttpStatus.OK,
      status: 'active',
      message: MSG_ACTIVE_PROMO_CODE,
    };
  }
}
