import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sass_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '分类名称',
    default: '',
  })
  name: string;

  @Column({
    comment: '是否使用',
    default: false,
  })
  isShow?: boolean;

  @CreateDateColumn({
    nullable: true,
    comment: '创建时间',
  })
  create_date: Date | null;

  @UpdateDateColumn({
    nullable: true,
    comment: '更新时间',
  })
  update_date: Date | null;
}
