import { SystemDto } from '@/dtos';
import { SystemEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemEntity)
    private readonly systemRepository: Repository<SystemEntity>,
  ) {}

  /**
   * 创建系统信息
   * @param createInfo
   * @returns
   */
  async createSystemInfo(createInfo: SystemDto) {
    const systemInfo = await this.systemRepository.find();
    if (!!systemInfo.length) {
      throw new HttpException(
        '系统信息已存在，不用重复创建',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.systemRepository.create(createInfo);
    return await this.systemRepository.save(result);
  }

  /**
   * 获取网页相关信息
   */
  async getInfo(): Promise<SystemEntity> {
    const systemInfo = await this.systemRepository
      .createQueryBuilder('sass_system')
      .getOne();
    return systemInfo;
  }

  /**
   * 更新信息并返回最新的数据
   * @param body
   * @returns
   */
  async updateInfo(body: SystemDto) {
    const exitsSystemInfo = await this.systemRepository
      .createQueryBuilder('sys_system')
      .getOne();
    if (!exitsSystemInfo) {
      throw new HttpException('系统信息不存在', HttpStatus.NOT_FOUND);
    }

    const updateSystemInfo = this.systemRepository.merge(exitsSystemInfo, body);
    return this.systemRepository.save(updateSystemInfo);
  }
}
