import { CategoryDto } from '@/dtos';
import { PaginationResultDto, QueryDto } from '@/dtos/page.dto';
import { CategoryEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * @description 新增标签
   * @param payload
   * @returns
   */
  async create(payload: CategoryDto): Promise<CategoryEntity> {
    const { name } = payload;
    const result = await this.categoryRepository.findOneBy({ name });
    if (result) {
      throw new HttpException('分类名称重复', HttpStatus.BAD_REQUEST);
    }
    return await this.categoryRepository.save(payload);
  }

  /**
   * 删除分类
   * @param id 分类ID
   * */
  async remove(id: string) {
    const exitsCategory = await this.categoryRepository.findOneBy({ id });
    if (!exitsCategory) {
      throw new HttpException('分类不存在', HttpStatus.NOT_FOUND);
    }
    return await this.categoryRepository.remove(exitsCategory);
  }

  /**
   * 更新分类
   * @param id 分类ID
   * @param payload 分类参数
   * */
  async update(id: string, payload: CategoryDto) {
    const exitsCategory = await this.categoryRepository.findOneBy({ id });
    if (!exitsCategory) {
      throw new HttpException('分类不存在', HttpStatus.NOT_FOUND);
    }
    const result = await this.categoryRepository.merge(exitsCategory, payload);
    return await this.categoryRepository.save(result);
  }

  /**
   * 获取所有标签
   * @param payload 参数
   * */
  async findAll(query: QueryDto): Promise<PaginationResultDto> {
    const { pageNum, search, limit } = query;
    const skipNum = (pageNum - 1) * limit;
    const [result, counts] = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.name LIKE :name', {
        name: search ? `%${search}%` : '%',
      })
      .orderBy('category.update_date', 'DESC')
      .skip(skipNum)
      .limit(limit)
      .getManyAndCount();
    return {
      totalCount: counts,
      data: result,
    };
  }
}
