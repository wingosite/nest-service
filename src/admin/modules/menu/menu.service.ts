import { MenuDto } from '@/dtos';
import { PaginationResultDto, QueryDto } from '@/dtos/page.dto';
import { MenuEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  /**
   * 获取所有菜单
   */
  async getMenus(): Promise<MenuEntity[]> {
    return await this.menuRepository.find({ order: { sort: 'ASC' } });
  }

  /**
   * 获取菜单列表
   */
  async getList(query: QueryDto): Promise<PaginationResultDto> {
    const { search, limit, pageNum } = query;
    const skipCount = (pageNum - 1) * limit;
    const [data, totalCount] = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.name LIKE :name', { name: search ? `%${search}%` : '%' })
      .orderBy('menu.sort', 'ASC')
      .skip(skipCount)
      .limit(limit)
      .getManyAndCount();
    return {
      data,
      totalCount,
    };
  }
  /**
   * 创建菜单
   */
  async createMenu(menu: MenuDto): Promise<MenuEntity> {
    const { name } = menu;
    const existMenu = await this.menuRepository.findOneBy({ name });
    if (existMenu) {
      throw new HttpException('菜单已存在', HttpStatus.BAD_REQUEST);
    }
    const result = await this.menuRepository.create(menu);
    return await this.menuRepository.save(result);
  }

  /**
   * 编辑菜单
   */
  async updateMenu(id: string, updateMenu: MenuDto): Promise<MenuEntity> {
    const existMenu = await this.menuRepository.findOneBy({ id });
    if (!existMenu) {
      throw new HttpException('菜单不存在', HttpStatus.NOT_FOUND);
    }
    const result = await this.menuRepository.merge(existMenu, updateMenu);
    return await this.menuRepository.save(result);
  }

  /**
   * 删除菜单
   */
  async deleteMenu(id: string): Promise<MenuEntity> {
    const existMenu = await this.menuRepository.findOneBy({ id });
    if (!existMenu) {
      throw new HttpException('菜单不存在', HttpStatus.NOT_FOUND);
    }
    return await this.menuRepository.remove(existMenu);
  }

  /**
   * 批量删除
   * @param ids
   */
  async deleteMany(ids: string) {
    try {
      await this.menuRepository
        .createQueryBuilder('menu')
        .delete()
        .from(MenuEntity)
        .where('id in :ids', { ids: [ids.split(',')] })
        .execute();
    } catch (e) {
      console.log(e, 'exception');
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }
}
