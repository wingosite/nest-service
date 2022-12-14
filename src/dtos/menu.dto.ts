import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty({
    required: true,
    default: 0,
    description: '菜单类型 0 目录 1 菜单 2 按钮',
  })
  type: 0 | 1 | 2;

  @ApiProperty({
    required: true,
    default: '',
    description: '菜单名称',
  })
  name: string;

  @ApiProperty({
    required: false,
    default: '',
    description: '菜单图标',
  })
  iconName: string;

  @ApiProperty({
    required: false,
    default: '',
    description: '路由地址',
  })
  routePath: string;

  @ApiProperty({
    required: false,
    default: '',
    description: '路由名称',
  })
  routeName: string;

  @ApiProperty({
    required: false,
    default: false,
    description: '是否隐藏',
  })
  hidden: boolean;

  @ApiProperty({
    required: false,
    default: false,
    description: '是否缓存',
  })
  keepAlive: boolean;

  @ApiProperty({
    required: false,
    default: false,
    description: '是否外链',
  })
  external: boolean;

  @ApiProperty({
    required: false,
    default: null,
    description: '父节点',
  })
  parentId: string | null;

  @ApiProperty({
    required: false,
    default: '',
    description: '权限代码',
  })
  code: string;

  @ApiProperty({
    required: false,
    default: '',
    description: '文件路径',
  })
  filePath: string;

  @ApiProperty({
    required: false,
    default: 0,
    description: '排序',
  })
  sort: number;
}
