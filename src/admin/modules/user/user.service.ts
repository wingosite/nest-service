import { PaginationResultDto, QueryDto, UserDto } from '@/dtos';
import { RoleEntity, UserEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 创建新用户
   * @param user 用户信息
   */
  async addUser(user: UserDto) {
    const roles = [];
    const { username } = user;
    // 通过用户名检查当前用户是否已经存在
    const existUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    for (let i = 0; i < user.roles.length; i++) {
      const item = await queryRunner.manager.findOneBy(RoleEntity, {
        scope: user.roles[i],
      });
      roles.push(item);
    }
    await queryRunner.startTransaction();
    try {
      // 添加新用户，create只是创建了一个User对象，save才是保存到数据库
      const newUser = await this.usersRepository.create({
        ...user,
        roles: roles,
      });
      return await this.usersRepository.save(newUser);
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description 查询当前用户信息
   * @param name 用户名称
   */
  async findOne(username): Promise<UserEntity> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username=:username', { username })
      .leftJoin('user.roles', 'role')
      .select(['user'])
      .addSelect(['role.id', 'role.name', 'role.scope'])
      .getOne();
    if (!result) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * 通过用户ID查询用户信息
   * @param id 用户ID
   */
  async findOneById(id): Promise<UserEntity> {
    const result = await this.usersRepository.findOneBy({ id });
    if (!result) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * 分页查询用户列表
   * @param query
   * @returns
   */
  async getUserList(query: Partial<QueryDto>): Promise<PaginationResultDto> {
    const { limit, pageNum, search } = query;
    const skip = (pageNum - 1) * limit;
    const [data, totalCount] = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username LIKE :search', {
        search: search ? `%${search}%` : '%',
      })
      .orderBy('user.create_date', 'DESC')
      .offset(skip)
      .limit(limit)
      .leftJoin('user.roles', 'role')
      .select(['user'])
      .addSelect(['role.id', 'role.name', 'role.scope'])
      .getManyAndCount();
    return {
      totalCount,
      data,
    };
  }

  /**
   * 删除用户
   * @param id
   * @returns
   */
  async deleteUser(id) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return await this.usersRepository.remove(user);
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param user 用户信息
   * @returns
   */
  async updateUser(id: string, user: UserDto): Promise<UserEntity> {
    const roles = [];
    const userInfo = await this.usersRepository.findOneBy({ id });
    if (!userInfo) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    for (let i = 0; i < user.roles.length; i++) {
      const item = await queryRunner.manager.findOneBy(RoleEntity, {
        scope: user.roles[i],
      });
      roles.push(item);
    }
    await queryRunner.startTransaction();
    try {
      const result = await this.usersRepository.merge(userInfo, {
        ...user,
        roles: roles,
      });
      return await this.usersRepository.save(result);
    } catch (e) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
