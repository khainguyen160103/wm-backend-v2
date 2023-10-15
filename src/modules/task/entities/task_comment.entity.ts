import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class TaskComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'content', type: 'longtext' })
  content: string

  @Column({ name: 'task_id' })
  task_id: number

  @Column({ name: 'account_id' })
  account_id: number

  @UpdateDateColumn()
  updated_at?: Date | string
}
