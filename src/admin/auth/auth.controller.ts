import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../modules/user/user.service';
import { LoginDto, RefreshTokenDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

export const jwtConstants = {
  secret: 'bronsonkey',
};

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiTags('登录')
  @ApiOperation({ summary: '用户登录', description: '用户登录' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('getUserInfo')
  @ApiTags('登录')
  @ApiOperation({ summary: '用户信息', description: '获取登录用户信息' })
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Request() req) {
    return req.user;
  }

  @Post('refreshToken')
  @ApiTags('登录')
  @ApiOperation({ summary: '刷新Token', description: '刷新Token' })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() token: RefreshTokenDto): Promise<TokenDto> {
    try {
      return await this.authService.refreshToken(token);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to refresh token' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
