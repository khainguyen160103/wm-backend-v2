import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { PostUser } from './post_user.entity'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'content', type: 'longtext' })
  content?: string

  @Column({ name: 'created_by_id' })
  created_by_id?: number

  // @OneToMany(() => Comment, (comment) => comment.post)
  // comments: Comment[]

  post_users?: PostUser[]

  post_user: PostUser

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
