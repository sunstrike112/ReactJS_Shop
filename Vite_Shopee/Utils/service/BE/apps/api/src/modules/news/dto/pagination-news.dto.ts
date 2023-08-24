import { PartialType, PickType, IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '@crud/dto/pagination.dto';
import { NewsDto } from './news.dto';

export class NewsItemsDto {
  items: NewsDto[]
}

export class PaginationNewsDto extends IntersectionType(
  NewsItemsDto,
  PaginationDto,
) {}
