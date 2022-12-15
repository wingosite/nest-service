import { QueryDto } from '@/dtos/page.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppArticleService } from './article.service';

@Controller('article')
export class AppArticleController {
  constructor(private readonly appArticleService: AppArticleService) {}

  @ApiTags('文章管理')
  @ApiOperation({ summary: '获取文章列表', description: '查询文章' })
  @Get('/list')
  async list() {
    return this.appArticleService.getList();
  }

  @ApiTags('文章管理')
  @Get('getListByTagName')
  @ApiOperation({ summary: '查询文章', description: '分页查询' })
  async getListByTagName(@Query() query: QueryDto) {
    return this.appArticleService.getArticleByTagName(query);
  }

  @ApiTags('文章管理')
  @ApiOperation({ summary: '获取最新的五条数据', description: '查询最新数据' })
  @Get('/latest')
  async getLatest() {
    return this.appArticleService.getLatest();
  }

  @ApiTags('文章管理')
  @ApiOperation({ summary: '获取推荐文章列表', description: '获取推荐数据' })
  @Get('/recommend/list')
  async getRecommendList() {
    return this.appArticleService.getRecommendList();
  }

  @ApiTags('文章管理')
  @ApiOperation({ summary: '根据ID获取文章内容', description: '查询文章详情' })
  @Get('/:id')
  async getArticleDetail(@Param('id') id: string) {
    return this.appArticleService.getArticleById(id);
  }
}
