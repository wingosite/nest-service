import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ title: '用户名', example: '张三' })
  username: string;

  @ApiProperty({ title: '密码', example: '123456789' })
  password: string;
}

export class TokenDto {
  @ApiProperty()
  readonly accessToken: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  readonly refreshToken: string;
}
