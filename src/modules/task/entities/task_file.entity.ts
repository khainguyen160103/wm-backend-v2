import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'

@Entity()
export class TaskFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'task_id' })
  task_id: number

  @Column({ name: 'type' })
  type?: string

  @UpdateDateColumn()
  updated_at?: Date | string

  @ManyToOne(() => Task, (task) => task.task_files)
  task?: Task
}
