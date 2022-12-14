import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    required: true,
    description: '角色名称',
    default: '',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: '角色类型',
    default: 1,
  })
  type: 0 | 1;

  @ApiProperty({
    required: true,
    description: '',
    default: 'visitor',
  })
  scope: string;

  @ApiProperty({
    required: false,
    description: '权限列表',
    default: [],
  })
  permissions: string[];

  @ApiProperty({
    description: '描述',
    default: '',
    required: false,
  })
  description: string;
}
