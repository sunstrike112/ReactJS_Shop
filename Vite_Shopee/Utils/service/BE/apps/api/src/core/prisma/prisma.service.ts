import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
// import { UserDto } from '../user/dto/user.dto';
// import { GeneratedUserEntity } from '../generated/user.dto';
import { classToPlain, plainToClass, serialize } from 'class-transformer';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      return await next(params);
    })
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}