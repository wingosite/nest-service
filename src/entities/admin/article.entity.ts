import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sass_article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '文章标题',
    default: '',
  })
  title: string;

  @Column({
    comment: '文章描述',
    default: '',
  })
  description: string;

  @Column({
    comment: '文章分类',
    default: '',
  })
  categories: string;

  @Column({
    comment: '文章封面图',
    default: '',
  })
  cover_image: string;

  @Column({
    comment: '作者',
  })
  author: string;

  @Column({
    comment: '是否推荐',
    default: false,
  })
  isRecommend: boolean;

  @Column({
    comment: '内容',
  })
  content: string;

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
