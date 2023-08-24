import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Max } from 'class-validator';
import { GeneratedNewsEntity } from '@generated/news.dto';

export class CreateNewsDto extends OmitType(GeneratedNewsEntity, ['organization', 'author', 'createdAt', 'updatedAt', 'deletedAt'] as const) {
}