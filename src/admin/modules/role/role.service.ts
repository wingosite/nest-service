import { RoleDto } from '@/dtos';
import { PaginationResultDto, QueryDto } from '@/dtos/page.dto';
import { RoleEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  /**
   * 获取角色列表
   */
  async getRoleList(query: QueryDto): Promise<PaginationResultDto> {
    const { limit, search, pageNum } = query;
    const skipCount = (pageNum - 1) * limit;
    const [data, totalCount] = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name LIKE :name', { name: search ? `%${search}%` : '%' })
      .orderBy('role.update_date', 'DESC')
      .skip(skipCount)
      .limit(limit)
      .getManyAndCount();

    return {
      totalCount,
      data,
    };
  }

  /**
   * 创建角色
   */
  async createRole(query: RoleDto): Promise<RoleEntity> {
    const { name } = query;
    const existRole = await this.roleRepository.findOneBy({ name });
    if (existRole) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }
    const result = await this.roleRepository.create(query);
    return await this.roleRepository.save(result);
  }

  /**
   * 更新角色
   */
  async updateRole(id: string, body: RoleDto): Promise<RoleEntity> {
    const existRole = await this.roleRepository.findOneBy({ id });
    if (!existRole) {
      throw new HttpException('角色不存在', HttpStatus.NOT_FOUND);
    }
    const result = await this.roleRepository.merge(existRole, body);
    return await this.roleRepository.save(result);
  }

  /**
   * 删除角色
   */
  async deleteRole(id: string): Promise<RoleEntity> {
    const existRole = await this.roleRepository.findOneBy({ id });
    if (!existRole) {
      throw new HttpException('角色不存在', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepository.remove(existRole);
  }
}
