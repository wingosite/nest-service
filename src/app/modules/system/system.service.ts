import { SystemEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemEntity)
    private systemRepository: Repository<SystemEntity>,
  ) {}

  /**
   * 获取系统信息 - 网站信息
   */
  async getSystemInfo() {
    const result = await this.systemRepository
      .createQueryBuilder('system')
      .getOne();
    if (!result) {
      throw new HttpException('系统信息不存在', HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
