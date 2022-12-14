import { ApiProperty } from '@nestjs/swagger';

export class SystemDto {
  @ApiProperty({
    required: false,
    description: '标题',
  })
  readonly title: string;

  @ApiProperty({
    required: false,
    description: '问候语',
  })
  readonly greet_words: string;

  @ApiProperty({
    required: false,
    description: '网页标题',
  })
  readonly w_title: string;

  @ApiProperty({
    required: false,
    description: '网页描述',
  })
  readonly w_description: string;

  @ApiProperty({
    required: false,
    description: '网页关键词',
  })
  readonly w_keyword: string;

  @ApiProperty({
    required: false,
    description: '备案信息',
  })
  readonly w_beian: string;

  @ApiProperty({
    required: false,
    description: '版本信息',
  })
  readonly w_version: string;
}
