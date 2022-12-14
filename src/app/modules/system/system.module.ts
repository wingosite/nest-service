import { SystemEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemEntity])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
