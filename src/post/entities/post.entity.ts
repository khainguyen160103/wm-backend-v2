import { Category } from 'src/category/entities'
import { Comment } from 'src/comment/entities'
import { Hastag } from 'src/hastag/entities'
import { Media } from 'src/media/entities'
import { User } from 'src/user/entities'
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

  created_by?: User

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category

  @ManyToMany(() => Media)
  @JoinTable({ name: 'post_medias' })
  medias: Media[]

  @ManyToMany(() => Hastag)
  @JoinTable({ name: 'post_hastags' })
  hastags: Hastag[]

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  post_users?: PostUser[]

  post_user: PostUser

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
