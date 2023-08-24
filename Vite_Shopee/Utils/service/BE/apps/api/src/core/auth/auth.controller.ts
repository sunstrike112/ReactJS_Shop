import { Controller, Req, Res, Request, Param, HttpStatus, Get, Post, UseGuards, ClassSerializerInterceptor, UseInterceptors, HttpCode, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TransformDtoInterceptor } from '@interceptors/transform-dto.interceptor';
import { AuthReqInterceptor } from './interceptors/auth-req.interceptor';
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
import { isMatchHash, hashValue } from '@helpers/hash.helper'
import { SentryInterceptor } from '@interceptors/sentry.interceptor';
import { EnumToArrayInterceptor } from '@interceptors/enum-array.interceptor';
import { UserLoginedDto, LoginRequestDto } from './dto/auth.dto';
import { GeneratedGender } from '@generated/gender.enum';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { AzureADGuard } from './guards/azure-ad.guard';
import { User } from './decorators/user.decorator';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(SentryInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Local Login' })
  @ApiBody({
    type: LoginRequestDto
  })
  @ApiResponse({
    status: 200,
    description: 'The login has been successfully.',
    type: UserLoginedDto,
  })
  // @UseInterceptors(new AuthReqInterceptor())
  @UseInterceptors(new TransformDtoInterceptor(UserLoginedDto))
  async login(@Req() req: any) {
    const { user } = req;
    const { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken } =
      await this.authService.handleResponseAccessRefreshToken(user.email);

    if (user.isTwoFactorAuthenticationEnabled) {
      const user2FA = {
        accessToken: userLogined.accessToken,
        isTwoFactorAuthenticationEnabled: userLogined.isTwoFactorAuthenticationEnabled
      };

      return user2FA;
    }
    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh' })
  @ApiBearerAuth()
  @ApiBody({
    type: LoginRequestDto
  })
  @ApiResponse({
    status: 200,
    description: 'The refresh has been successfully.',
    type: UserLoginedDto,
  })
  // @UseInterceptors(new AuthReqInterceptor())
  @UseInterceptors(new TransformDtoInterceptor(UserLoginedDto))
  async refresh(@Req() req: any) {
    const { user } = req;
    const { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken } =
      await this.authService.handleResponseAccessRefreshToken(user.email);
    userLogined['refreshToken'] = refreshToken;
    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    return userLogined;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  async logOut(@Req() req: any) {
    const { user } = req;
    await this.authService.removeRefreshToken(user.email);
    // req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    return { statusCode: 200, message: "sucessfully" };
  }

  @Get("/aad")
  @ApiOperation({ summary: 'Azure AD authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User detail'
  })
  @UseGuards(AzureADGuard)
  async azureADAuth() {}

  @Post("/aad/redirect")
  @UseGuards(AzureADGuard)
  async azureADAuthRedirect(@User() user, @Req() req: any): Promise<any> {
    const { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken } =
      await this.authService.createSocialUser(user);

    req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    userLogined['refreshToken'] = refreshToken;

    return userLogined;
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password for user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The forgot password email has been sent.'
  })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    await this.authService.forgotPassword(email);
  
    return {
      statusCode: HttpStatus.OK,
      message: 'The forgot password email has been sent.',
    };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password for user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password has been successfully.'
  })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Reset password has been successfully.',
    };
  }
}
