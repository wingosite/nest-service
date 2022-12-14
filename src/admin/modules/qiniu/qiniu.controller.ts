import { Controller, Get } from '@nestjs/common';
import { QiniuService } from './qiniu.service';

@Controller('file')
export class QiniuController {
  constructor(private readonly qiniuService: QiniuService) {}

  @Get('getImageList')
  async getImageList() {
    return await this.qiniuService.getImageList();
  }
}
