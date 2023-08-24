import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsNotEmpty } from 'class-validator';
import { GeneratedNewsEntity } from '@generated/news.dto';
import { UserDto } from '@core/user/dto/user.dto';

export class NewsDto extends OmitType(GeneratedNewsEntity, ['organization', 'author'] as const) {
  author: UserDto
}