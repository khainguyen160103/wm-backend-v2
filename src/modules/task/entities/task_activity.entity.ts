import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'
import { Account } from 'src/modules/account/entities'

export enum ActivityType {
  COMMENT = 'comment',
  ASSIGN_TASK = 'assign_task',
  CHANGE_COLUMN = 'change_column',
  EVALUATE_TASK = 'evaluate_task',
}

interface CommentContent {
  comment_id: number
  project_id: number
  comment_by: Account
}

interface ChangeColumn {
  column_id: number
  by_id: number // người chuyển trạng thái
  project_id: number
  change_by: Account
}

interface AssignTask {
  project_id: number
  assignee: Account // người được giao việc
  assign_by: Account // người giao việc
}

interface EvaluateTask {
  project_id: number
  assignee_id: number // người được giao việc
  assign_by: Account //người đánh giá
}

@Entity()
export class TaskActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'content', type: 'json', nullable: true })
  content?: CommentContent | ChangeColumn | AssignTask | EvaluateTask | any

  @Column({
    name: 'type',
    type: 'enum',
    enum: Object.values(ActivityType),
  })
  type?: ActivityType

  @Column({ name: 'task_id', nullable: true })
  task_id?: number

  @UpdateDateColumn()
  updated_at?: Date | string

  @ManyToOne(() => Task, (task) => task.task_activities)
  task?: Task
}
