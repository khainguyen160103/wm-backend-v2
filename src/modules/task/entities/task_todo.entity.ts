import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class TaskTodo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'content', length: 256 })
  content: string

  @Column({ name: 'task_id' })
  task_id: number

  @Column({ name: 'is_checked', type: 'boolean', default: false })
  is_checked?: boolean
}
