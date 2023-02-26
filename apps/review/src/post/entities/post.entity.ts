import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'content', type: 'longtext' })
  content?: string

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
