import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';
@Controller('sys')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @ApiTags('系统管理')
  @Get('/info')
  async getInfo() {
    return await this.systemService.getSystemInfo();
  }
}
