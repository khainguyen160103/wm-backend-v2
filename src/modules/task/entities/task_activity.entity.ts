import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Account } from 'src/modules/account/entities'
import { Task } from './task.entity'

export enum ActivityType {
  COMMENT = 'comment',
  ASSIGN_TASK = 'assign_task',
  CHANGE_COLUMN = 'change_column',
}

interface CommentContent {
  comment_by_id: number
  comment_id: number
}

@Entity()
export class TaskActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'content', type: 'json' })
  content: CommentContent

  @Column({ name: 'task_id', nullable: true })
  task_id?: number

  @Column({
    name: 'type',
    enum: Object.values(ActivityType),
    nullable: true,
  })
  type?: ActivityType

  @UpdateDateColumn()
  updated_at?: Date | string

  @ManyToOne(() => Task, (task) => task.task_activities, { cascade: true })
  task?: Task
}
