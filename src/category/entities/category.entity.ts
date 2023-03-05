import { Post } from 'src/post/entities'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'code' })
  code: string

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[]

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}
