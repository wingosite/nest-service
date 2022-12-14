import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiTags('文章分类')
  @ApiOperation({ summary: '获取列表', description: '获取分类列表' })
  @Get('list')
  async getList() {
    return await this.tagService.getList();
  }

  @ApiTags('文章分类')
  @ApiOperation({
    summary: '根据分类名称获取列表',
    description: '获取分类列表',
  })
  @Get('getListByName')
  async getListByName(@Query('name') name: string) {
    return await this.tagService.getListByName(name);
  }
}
