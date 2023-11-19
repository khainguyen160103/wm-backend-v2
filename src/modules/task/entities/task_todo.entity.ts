import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'

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

  @ManyToOne(() => Task, (task) => task.task_todos, { cascade: true })
  task?: Task
}
