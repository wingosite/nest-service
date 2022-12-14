import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    default: '',
    description: '用户昵称',
  })
  readonly username: string;

  @ApiProperty({
    required: true,
    description: '密码',
  })
  readonly password: string;

  @ApiProperty({
    required: false,
    description: '头像',
  })
  readonly avatar: string;

  @IsPhoneNumber('CN')
  @ApiProperty({
    required: false,
    description: '手机号码',
  })
  readonly phone: string;

  @IsEmail()
  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  readonly email: string;

  @ApiProperty({
    required: false,
    description: '描述',
  })
  readonly description: string;

  @ApiProperty({
    required: false,
    description: '角色',
  })
  readonly roles: any[];
}
