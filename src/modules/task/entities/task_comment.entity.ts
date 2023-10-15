import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'
import { Account } from 'src/modules/account/entities'

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

  @ManyToOne(() => Task, (task) => task.task_comments)
  task?: Task

  @ManyToOne(() => Account, (account) => account.task_comments)
  account?: Account
}
