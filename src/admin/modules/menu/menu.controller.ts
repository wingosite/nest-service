import { MenuDto } from '@/dtos';
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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiTags('菜单管理')
  @Get('getMenus')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '获取所有菜单',
    description: '获取所有菜单',
  })
  async getMenus() {
    return await this.menuService.getMenus();
  }

  @ApiTags('菜单管理')
  @Get('getMenuList')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '获取菜单列表',
    description: '获取菜单列表',
  })
  async getMenuList(@Query() query: QueryDto) {
    return await this.menuService.getList(query);
  }

  @ApiTags('菜单管理')
  @Post('createMenu')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '新建菜单',
    description: '新建一个菜单',
  })
  async createMenu(@Body() body: MenuDto) {
    return await this.menuService.createMenu(body);
  }

  @ApiTags('菜单管理')
  @Delete(':id/deleteMenu')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: '删除菜单',
    description: '删除一个菜单',
  })
  async deleteMenu(@Param('id') id: string) {
    return await this.menuService.deleteMenu(id);
  }

  @ApiTags('菜单管理')
  @Delete('deleteMany')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: '批量删除菜单',
    description: '批量删除菜单',
  })
  async deleteMany(@Query('ids') ids: string) {
    return await this.menuService.deleteMany(ids);
  }

  @ApiTags('菜单管理')
  @Patch(':id/updateMenu')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '更新菜单',
    description: '更新菜单信息',
  })
  async updateMenu(@Param('id') id: string, @Body() body: MenuDto) {
    return await this.menuService.updateMenu(id, body);
  }
}
