import { Module } from '@nestjs/common';
import { QiniuController } from './qiniu.controller';
import { QiniuService } from './qiniu.service';

@Module({
  controllers: [QiniuController],
  providers: [QiniuService],
})
export class QiniuModule {}
