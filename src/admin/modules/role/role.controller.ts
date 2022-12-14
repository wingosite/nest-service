import { RoleDto } from '@/dtos';
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
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiTags('角色管理')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取角色列表', description: '获取角色列表' })
  @Get('getRoleList')
  async getRoleList(@Query() query: QueryDto) {
    return await this.roleService.getRoleList(query);
  }

  @ApiTags('角色管理')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建角色', description: '创建角色' })
  @Post('createRole')
  async createRole(@Body() body: RoleDto) {
    return await this.roleService.createRole(body);
  }

  @ApiTags('角色管理')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新角色', description: '更新角色信息' })
  @Patch(':id/updateRoleInfo')
  async updateRoleInfo(@Param('id') id: string, @Body() query: RoleDto) {
    return await this.roleService.updateRole(id, query);
  }

  @ApiTags('角色管理')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除角色', description: '删除角色' })
  @Delete(':id/deleteRole')
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
