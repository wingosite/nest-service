import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({
    required: false,
    description: '搜索',
  })
  search: string;

  @ApiProperty({
    required: false,
    description: '页码',
    example: 1,
  })
  pageNum: number;

  @ApiProperty({
    required: false,
    description: '数量',
    example: 20,
  })
  limit: number;
}

export class PaginationResultDto {
  @ApiProperty({
    description: '总数',
    example: 50,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: '数据集合',
  })
  readonly data?: any[];
}
