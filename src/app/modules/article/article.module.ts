import { ArticleEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppArticleController } from './article.controller';
import { AppArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [AppArticleService],
  controllers: [AppArticleController],
})
export class AppArticleModule {}
