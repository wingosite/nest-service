import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({
    required: true,
    description: '文章标题',
  })
  readonly title: string;

  @ApiProperty({
    required: false,
    description: '文章描述',
  })
  readonly desc: string;

  @ApiProperty({
    required: false,
    description: '文章分类',
  })
  readonly categories: string;

  @ApiProperty({
    required: false,
    description: '文章缩略图',
  })
  readonly cover_image: string;

  @ApiProperty({
    required: false,
    description: '创建者',
  })
  readonly author: string;

  @ApiProperty({
    required: false,
    description: '文章内容',
  })
  readonly content: string;
}

export class SearchDto {
  @ApiProperty({
    required: false,
    description: '每页条数',
  })
  readonly limit: number;

  @ApiProperty({
    required: false,
    description: '页码',
  })
  readonly pageNum: number;

  @ApiProperty({
    required: false,
    description: '关键词',
  })
  readonly search: string;
}
