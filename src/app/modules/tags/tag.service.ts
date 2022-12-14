import { CategoryEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(CategoryEntity)
    private tagRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * 获取分类列表
   *
   * */
  async getList() {
    return await this.tagRepository.find();
  }

  /**
   * 根据标签名称获取列表
   * @returns
   */
  async getListByName(name: string) {
    return await this.tagRepository
      .createQueryBuilder('category')
      .where('category.name LIKE :name', { name: name ? `%${name}%` : '%' })
      .getMany();
  }
}
