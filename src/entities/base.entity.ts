import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export declare class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

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
