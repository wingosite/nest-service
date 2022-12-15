// import { RolesGuard } from '@/admin/auth/role.guard';
import { ArticleDto } from '@/dtos';
import { QueryDto } from '@/dtos/page.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiTags('文章管理')
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @ApiOperation({ summary: '查询文章', description: '分页查询' })
  async list(@Query() body: QueryDto) {
    return this.articleService.findAll(body);
  }

  @ApiTags('文章管理')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建文章', description: '创建文章' })
  async create(@Body() body: ArticleDto) {
    return this.articleService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiTags('文章管理')
  @Get(':id/info')
  @ApiOperation({ summary: '查询文章详情', description: '通过ID查询文章详情' })
  async findById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('文章管理')
  @Patch(':id/update')
  @ApiOperation({ summary: '更新文章', description: '更新文章' })
  @HttpCode(HttpStatus.OK)
  async updateArticle(@Param('id') id: string, @Body() body: ArticleDto) {
    return this.articleService.updateArticle(id, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('文章管理')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/delete')
  @ApiOperation({ summary: '删除单个文章', description: '删除文章' })
  async deleteSingleArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('文章管理')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('deleteMany')
  @ApiOperation({ summary: '批量删除文章', description: '批量删除文章' })
  async deleteManyArticle(@Body('ids') ids: string) {
    return this.articleService.deleteManyArticle(ids);
  }
}
