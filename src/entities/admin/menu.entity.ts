import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sass_menus')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0,
    comment: '菜单类型',
  })
  type: 0 | 1 | 2; // 0 目录 1 菜单 2 按钮

  @Column({
    default: '',
    comment: '菜单名称',
  })
  name: string;

  @Column({
    default: '',
    comment: '菜单图标',
  })
  iconName: string;

  @Column({
    default: '',
    comment: '路由地址',
  })
  routePath: string;

  @Column({
    default: '',
    comment: '路由名称',
  })
  routeName: string;

  @Column({
    default: false,
    comment: '是否隐藏',
  })
  hidden: boolean;

  @Column({
    default: false,
    comment: '是否缓存',
  })
  keepAlive: boolean;

  @Column({
    default: null,
    comment: '父节点',
  })
  parentId: string | null;

  @Column({
    default: '',
    comment: '文件地址',
  })
  filePath: string;

  @Column({
    default: 0,
    comment: '排序',
  })
  sort: number;

  @Column({
    default: '',
    comment: '排序',
  })
  code: string;

  @Column({
    default: false,
    comment: '是否外链',
  })
  external: boolean;

  @CreateDateColumn({
    nullable: true,
    comment: '创建时间',
  })
  create_date: Date;

  @UpdateDateColumn({
    nullable: true,
    comment: '更新时间',
  })
  update_date: Date | null;
}
