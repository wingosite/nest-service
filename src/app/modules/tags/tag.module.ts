import { CategoryEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
