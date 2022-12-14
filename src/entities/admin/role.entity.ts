import { UserEntity } from '@/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sass_roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: '',
    comment: '角色名称',
  })
  name: string;

  @Column({
    default: 1, // 0 系统内置 1 自定义
    comment: '角色类型',
  })
  type: 0 | 1;

  @Column({
    default: '',
    comment: '角色标识',
  })
  scope: string;

  @Column({
    default: '',
    comment: '角色描述',
  })
  description: string;

  @Column('simple-array')
  permissions: string[];

  @ManyToMany(() => UserEntity)
  user: UserEntity;

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
