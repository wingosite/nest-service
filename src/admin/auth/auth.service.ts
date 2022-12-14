import { UserEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserService } from '../modules/user/user.service';
import { RefreshTokenDto, TokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 校验用户的账号密码
   * @param username 用户名
   * @param password 用户密码
   * @returns
   */
  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    if (!user) {
      throw new HttpException('用户不存在!', HttpStatus.BAD_REQUEST);
    }
    if (!compareSync(password, user.password)) {
      throw new HttpException('密码不正确!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  /**
   * 刷新Token
   * @param token
   */
  async refreshToken(token: RefreshTokenDto): Promise<any> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token.refreshToken);
    } catch (error) {
      throw new HttpException('Token失效', 401);
    }
    const { type, id } = payload;
    if (type !== 'refresh') {
      throw new HttpException('不合法的Token', 401);
    }
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new HttpException('用户不存在', 404);
    }
    const authToken = this.createAccessToken(user);
    return Promise.resolve(authToken);
  }

  /**
   * 生成Token
   * @param user
   * @returns
   */
  async createAccessToken(user: Partial<UserEntity>): Promise<TokenDto> {
    const accessToken = this.jwtService.sign(user);
    return { accessToken };
  }

  /**
   * 用户登录获取Token
   * @param user 用户信息
   * @returns Token
   */
  async login(user: Partial<UserEntity>) {
    const { accessToken } = await this.createAccessToken({
      id: user.id,
      username: user.username,
      roles: user.roles,
    });
    return { accessToken };
  }

  /**
   * 获取用户信息
   * @param user
   * @returns
   */
  async getUser(user: UserEntity): Promise<UserEntity> {
    return await this.userService.findOne(user.username);
  }
}
