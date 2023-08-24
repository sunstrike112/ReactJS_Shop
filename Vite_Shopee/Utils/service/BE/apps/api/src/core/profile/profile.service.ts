import { CACHE_MANAGER, Injectable, Inject, UnauthorizedException, HttpStatus, forwardRef } from '@nestjs/common';
import { CrudService } from '@core/crud/crud.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Crud } from '@decorators/crud.decorator';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from './dto/update-profile.dto';
import { hashValue, isMatchHash, verifyPassword } from '@helpers/hash.helper';
import { MSG_OLD_PASSWORD_WRONG } from '@constants/messages.constant';
import { UserService } from '@core/user/user.service';

@Injectable()
@Crud("User")
export class ProfileService extends CrudService {
  constructor(
    public prisma: PrismaService,
    public configService: ConfigService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super(prisma, configService, cacheManager);
  }

  async getProfiles(user) {
    const result = await this.userService.findUserByEmail(user.email);
    delete result.currentHashedRefreshToken;

    return result;
  }

  async updateProfiles(user, updateProfileDto) {
    await this.update(user.id, updateProfileDto);
    const result = await this.getProfiles(user);
    return result;
  }

  async updatePassword(userId, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(userId);

    return await this.verifyAndChangePassword(user, updatePasswordDto);
  }

  async verifyAndChangePassword(user, updatePasswordDto: UpdatePasswordDto) {
      await verifyPassword(
        updatePasswordDto.password,
        user.password,
        MSG_OLD_PASSWORD_WRONG
      );

    return await this.changePassword(user, updatePasswordDto.newPassword);
  }

  async changePassword(user, newPassword) {
    const hashedNewPassword = await hashValue(newPassword);

    return await this.update(user.id, {
      password: hashedNewPassword
    });
  }
}
