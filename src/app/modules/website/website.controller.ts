import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppWebsiteService } from './website.service';

@Controller('common')
export class AppWebsiteController {
  constructor(private readonly appWebsiteService: AppWebsiteService) {}

  @Get('getBingImage')
  @ApiTags('公共接口')
  @ApiOperation({ summary: '获取每日一图', description: '获取必应的每日一图' })
  async getBingImage() {
    return this.appWebsiteService.getBingImage();
  }
}
