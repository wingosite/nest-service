import { RoleEntity } from '@/entities';
import * as bcryptjs from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const avatar =
  'https://pic3.zhimg.com/v2-4808dc335f0e84ee318e85a39cf84658_r.jpg?source=1940ef5c';

@Entity('sass_user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: avatar })
  avatar?: string;

  @Column({ default: null })
  phone?: string;

  @Column({ default: null })
  email?: string;

  @Column({ default: null })
  description?: string;

  @ManyToMany(() => RoleEntity, (role) => role.user)
  @JoinTable()
  roles: RoleEntity[];

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

  @BeforeInsert()
  async encryPwd() {
    this.password = await bcryptjs.hashSync(this.password);
  }
}
