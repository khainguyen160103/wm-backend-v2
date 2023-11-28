import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'

export enum ActivityType {
  COMMENT = 'comment',
  ASSIGN_TASK = 'assign_task',
  CHANGE_COLUMN = 'change_column',
  EVALUATE_TASK = 'evaluate_task',
}

interface CommentContent {
  comment_by_id: number
  comment_id: number
  project_id: number
}

interface ChangeColumn {
  from_colum_id: number
  to_column_id: number
  by_id: number
  project_id: number
}

interface AssignTask {
  project_id: number
  assignee_id: number // người được giao việc
  assign_by_id: number // người giao việc
}

interface EvaluateTask {
  project_id: number
  assignee_id: number // người được giao việc
  assign_by_id: number // người giao việc
}

@Entity()
export class TaskActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'content', type: 'json' })
  content: CommentContent | ChangeColumn | AssignTask | EvaluateTask

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
