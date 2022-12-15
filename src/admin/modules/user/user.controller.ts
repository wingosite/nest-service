import { QueryDto, UserDto } from '@/dtos';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor) // 不返回entity中设置了@Exclude()的字段
  @ApiTags('用户管理')
  @ApiBearerAuth() // 需要在上游添加token才能正常访问接口拿到数据，需要在admin.bootstrap.ts中配置.addBearerAuth()才会生效
  @Get('getUserInfoByName')
  @ApiOperation({
    summary: '通过用户名查询用户信息',
    description: '通过用户名查询用户信息',
  })
  @UseGuards(AuthGuard('jwt')) // 添加授权验证
  async findUserByName(@Query('name') name: string) {
    return this.userService.findOne(name);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('用户管理')
  @ApiBearerAuth()
  @Get('getUserList')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '分页查询用户列表', description: '获取用户列表' })
  async getUserList(@Query() query: QueryDto) {
    return this.userService.getUserList(query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('用户管理')
  @ApiBearerAuth()
  @Post('createUser')
  @ApiOperation({ summary: '创建用户', description: '注册新用户' })
  async createUser(@Body() body: UserDto) {
    return this.userService.addUser(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('用户管理')
  @ApiBearerAuth()
  @Delete(':id/deleteUser')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除一个用户', description: '通过ID删除用户' })
  async removeUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('用户管理')
  @ApiBearerAuth()
  @Patch(':id/updateUser')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除一个用户', description: '通过ID删除用户' })
  async updateUser(@Param('id') id: string, @Body() body: UserDto) {
    return this.userService.updateUser(id, body);
  }
}
