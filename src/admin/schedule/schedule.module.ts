import { Module } from '@nestjs/common';
import { ArticleModule } from '../modules/article/article.module';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService],
  imports: [ArticleModule],
})
export class OwnScheduleModule {}
