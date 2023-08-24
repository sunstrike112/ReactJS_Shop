import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { isMatchHash, hashValue, verifyPassword } from '@helpers/hash.helper'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { MSG_WRONG_CREDENTIALS } from '@constants/messages.constant';
import { ProfileService } from '@core/profile/profile.service';
import { Cache } from 'cache-manager';
import { ResetPasswordDto } from './dto/forgot-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerService } from '@modules/customer/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private profileService: ProfileService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    private customerService: CustomerService
  ) {}

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findOne({ email: email });
      if (!user.isActive) throw new HttpException(MSG_WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
      await this.verifyPassword(plainTextPassword, user.password);

      const { password, ...userTransformed } = user;
      return userTransformed;
    } catch (error) {
      // throw new UnauthorizedException();
      throw new HttpException(MSG_WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    await verifyPassword(plainTextPassword, hashedPassword);
    // const isPasswordMatching = await isMatchHash(plainTextPassword, hashedPassword);
    // if (!isPasswordMatching) throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  }

  async login(email: string) {
    const user = await this.userService.findUserByEmail(email);
    delete user.currentHashedRefreshToken;
    const payload = { email: user.email, isTwoFactorAuthenticationEnabled: user.isTwoFactorAuthenticationEnabled, isAdmin: true };
    return {
      accessToken: this.jwtService.sign(payload),
      ...user,
    };
  }

  getCookieWithJwtAccessToken(
    email: string,
    isTwoFactorAuthenticationEnabled: boolean = false,
    isAdmin: boolean = true
  ) {
    const payload: TokenPayload = { email, isTwoFactorAuthenticationEnabled, isAdmin };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  getCookieWithJwtRefreshToken(email: string, isTwoFactorAuthenticationEnabled: boolean, isAdmin = true) {
    const payload: TokenPayload = { email, isTwoFactorAuthenticationEnabled, isAdmin };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

  async handleResponseAccessRefreshToken(email: string) {
    const userLogined = await this.login(email);
    const isTwoFactorAuthenticationEnabled = userLogined.isTwoFactorAuthenticationEnabled;
    const accessTokenCookie = this.getCookieWithJwtAccessToken(email, isTwoFactorAuthenticationEnabled);

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(email, isTwoFactorAuthenticationEnabled);

    await this.setCurrentRefreshToken(refreshToken, email);

    return { userLogined, accessTokenCookie, refreshTokenCookie, refreshToken };
  }

  async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
    if (payload.email) {
      return await this.userService.findUserByEmail(payload.email);
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, payload: TokenPayload) {
    let user = null;
    if (payload.isAdmin) {
      user = await this.userService.findUserByEmail(payload.email);
    } else {
      user = await this.customerService.findCustomerByEmail(payload.email);
    }

    if (!user) throw new UnauthorizedException();
    const isRefreshTokenMatching = await isMatchHash(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) return user;
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken = await hashValue(refreshToken);
    await this.userService.update(
      { email: email },
      { currentHashedRefreshToken: currentHashedRefreshToken },
    );
  }

  async removeRefreshToken(email: string) {
    await this.userService.update(
      { email: email },
      { currentHashedRefreshToken: null },
    );
  }

  async setCurrentForgotPasswordToken(email: string, forgotPasswordToken: string) {
    const currentForgotPasswordToken = await hashValue(forgotPasswordToken);
    await this.userService.update(
      { email: email },
      { currentHashedForgotPasswordToken: currentForgotPasswordToken },
    );
  }

  async removeForgotPasswordToken(email: string) {
    await this.userService.update(
      { email: email },
      { currentHashedForgotPasswordToken: null },
    );
  }

  generateJwtForgotPassword(email: string, isAdmin = true) {
    const payload: TokenPayload = { email, isAdmin };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_FORGOT_PASSWORD_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_FORGOT_PASSWORD_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }

  async forgotPassword(email) {
    const user = await this.userService.findUserByEmail(email);
    const forgotPasswordToken = this.generateJwtForgotPassword(email);

    await this.setCurrentForgotPasswordToken(email, forgotPasswordToken);
    this.eventEmitter.emit('auth.forgotPassword', {user, forgotPasswordToken});
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.getUserFromResetPasswordToken(resetPasswordDto.token);

    await this.profileService.changePassword(user, resetPasswordDto.newPassword);
    this.removeForgotPasswordToken(user.email);
  }

  async getUserFromResetPasswordToken(token: string) {
    let user = null;
    const getField = {
      id: true,
      email: true,
      password: true,
      currentHashedForgotPasswordToken: true,
    }
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_FORGOT_PASSWORD_SECRET')
    });

    if (!payload.email) throw new BadRequestException();

    if (payload.isAdmin) {
      user = await this.userService.findUserByEmail(payload.email, getField);
    } else {
      user = await this.customerService.findCustomerByEmail(payload.email, getField);
    }

    if (!user || !user.currentHashedForgotPasswordToken) throw new BadRequestException();

    const isTokenMatching = await isMatchHash(
      token,
      user.currentHashedForgotPasswordToken,
    );
    if (!isTokenMatching) throw new BadRequestException();

    return user;
  }

  async createSocialUser(userDTO: any) {
    let user = null;

    try {
      user = await this.userService.findUserByEmail(userDTO.email);
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    if (user) {
      user = await this.userService.update(user.id, { provider: userDTO.provider });
    } else {
      user = await this.userService.createSocialUser(userDTO);
    }

    return await this.handleResponseAccessRefreshToken(user.email); 
  }
}
