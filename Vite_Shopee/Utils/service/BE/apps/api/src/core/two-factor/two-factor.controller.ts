import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { TwoFactorService } from './two-factor.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtTwoFactorGuard } from '../auth/guards/jwt-two-factor.guard';
import { TwoFactorAuthDto, TwoFactorSettingDto } from './dto/two-factor.dto';
import { UserLoginedDto } from '@core/auth/dto/auth.dto';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { User } from '@core/auth/decorators/user.decorator';

@Controller('auth/2fa')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorController {
  constructor(
    private readonly twoFactorService: TwoFactorService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get('qr-code')
  @ApiOperation({ summary: 'Turn on/off two factor authentication setting.' })
  @ApiBody({
    type: TwoFactorSettingDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'RQ Code'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDtoInterceptor(UserLoginedDto))
  async getQrCode(@User() user: any) {
    const qrCode = await this.twoFactorService.getQrCode(user);

    return qrCode;
  }

  @Post('toggle-setting')
  @ApiOperation({ summary: 'Turn on/off two factor authentication setting.' })
  @ApiBody({
    type: TwoFactorSettingDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Two factor authentication is turned on/off',
    type: UserLoginedDto,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDtoInterceptor(UserLoginedDto))
  async toggleTwoFactorAuthenticationSetting(
    @Req() req: any,
    @Body() { isEnableTwoFactorAuth }: TwoFactorSettingDto
  ) {
    const { user } = req;

    const qrCode = await this.twoFactorService.toggleTwoFactorAuthenticationSetting(user, isEnableTwoFactorAuth);

    const { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken } =
      await this.authService.handleResponseAccessRefreshToken(user.email);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;
    userLogined['qrCode'] = qrCode;

    return userLogined;
    
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: `Two factor authentication is turned ${isEnableTwoFactorAuth ? 'on' : 'off'}.`,
    // };
  }

  @Post('login')
  @ApiOperation({ summary: 'Two factor authentication.' })
  @ApiBody({
    type: TwoFactorAuthDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found user',
    type: UserLoginedDto,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDtoInterceptor(UserLoginedDto))
  async authenticate(
    @Req() req: any,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthDto
  ) {
    const { user } = req;

    await this.twoFactorService.validateRequest(
      twoFactorAuthenticationCode, user
    );

    const { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken } =
      await this.authService.handleResponseAccessRefreshToken(user.email);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }
}
