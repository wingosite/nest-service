import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sass_system')
export class SystemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID', comment: '主键' })
  id: number;

  @Column()
  title: string;

  @Column()
  greet_words: string;

  @Column()
  w_title: string;

  @Column()
  w_description: string;

  @Column()
  w_keyword: string;

  @Column()
  w_beian: string;

  @Column()
  w_version: string;

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
