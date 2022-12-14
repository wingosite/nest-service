import { Module } from '@nestjs/common';
import { AppWebsiteController } from './website.controller';
import { AppWebsiteService } from './website.service';

@Module({
  imports: [],
  exports: [],
  providers: [AppWebsiteService],
  controllers: [AppWebsiteController],
})
export class AppWebsiteModule {}
