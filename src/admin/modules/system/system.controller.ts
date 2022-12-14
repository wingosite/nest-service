import { SystemDto } from '@/dtos';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';

@Controller('sys')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('create')
  @ApiTags('系统管理')
  @ApiOperation({
    summary: '增加一条系统信息',
    description: '增加一条系统信息',
  })
  async create(@Body() body: SystemDto) {
    return await this.systemService.createSystemInfo(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取系统信息', description: '获取系统信息' })
  @Get('/info')
  @ApiTags('系统管理')
  async info() {
    return await this.systemService.getInfo();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新系统信息', description: '更新系统信息' })
  @Patch('/update')
  @ApiTags('系统管理')
  async update(@Body() body: SystemDto) {
    return await this.systemService.updateInfo(body);
  }
}
