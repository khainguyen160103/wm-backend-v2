import { Account } from 'src/modules/account/entities'
import { Entity, Column, UpdateDateColumn, ManyToOne, BaseEntity } from 'typeorm'
import { Task } from './task.entity'

@Entity('task_has_followers')
export class TaskHasFollower extends BaseEntity {
  @ManyToOne(() => Account, (account) => account.task_has_followers, { cascade: true })
  account?: Account

  @Column({ name: 'account_id', primary: true })
  account_id: number

  @ManyToOne(() => Task, (task) => task.task_has_followers, { cascade: true })
  task?: Task

  @Column({ name: 'task_id', primary: true })
  task_id: number

  @UpdateDateColumn()
  updated_at?: Date | string
}
