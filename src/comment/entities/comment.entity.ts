import { Media } from 'src/media/entities'
import { Post } from 'src/post/entities'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string

  @Column({ name: 'content', type: 'mediumtext' })
  content: string

  @Column({ name: 'post_id' })
  post_id: number

  /* id của commnent cha*/
  @Column({ name: 'parent_id' })
  parent_id?: number

  @Column({ name: 'created_by_id' })
  created_by_id: number

  @ManyToMany(() => Media)
  @JoinTable({ name: 'comment_medias' })
  medias: Media[]

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}
