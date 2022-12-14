import { CategoryDto } from '@/dtos';
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
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('分类管理')
  @ApiOperation({ summary: '查询分类', description: '查询所有分类' })
  @Get('list')
  async findAll(@Query() query?: QueryDto) {
    return await this.categoryService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('分类管理')
  @ApiOperation({ summary: '新建分类', description: '创建新的分类' })
  @Post('create')
  async create(@Body() body: CategoryDto) {
    return await this.categoryService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('分类管理')
  @ApiOperation({ summary: '更新分类', description: '更新分类' })
  @Patch(':id/updateCategory')
  async update(@Param('id') id: string, @Body() body: CategoryDto) {
    return await this.categoryService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('分类管理')
  @ApiOperation({ summary: '删除分类', description: '根据分类ID删除分类' })
  @Delete(':id/delete')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
