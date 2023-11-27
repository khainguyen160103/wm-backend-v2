import { Account } from 'src/modules/account/entities'
import { Board } from 'src/modules/board/entities'
import { Sprint } from 'src/modules/sprint/entities'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { TaskHasFollower } from './task_has_follower.entity'
import { TaskInColumn } from './task_in_column.entity'
import { Tag } from 'src/modules/tag/entities'
import { TaskTodo } from './task_todo.entity'
import { TaskFile } from './task_file.entity'
import { TaskComment } from './task_comment.entity'
import { TaskActivity } from './task_activity.entity'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'description', type: 'longtext', nullable: true })
  description?: string

  @ManyToOne(() => Account, (account) => account.task, { nullable: true })
  assignee?: Account

  @Column({ name: 'assignee_id', nullable: true })
  assignee_id?: number

  @Column({ name: 'due_date', type: 'datetime', nullable: true })
  due_date?: Date | string

  @Column({ name: 'related_task_id', nullable: true, comment: 'Task liên quan' })
  related_task_id?: number

  @Column({ name: 'sprint_id' })
  sprint_id?: number

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint?: Sprint

  @Column({ name: 'board_id', nullable: true })
  board_id?: number

  @ManyToOne(() => Board, (board) => board.tasks, { nullable: true })
  board?: Board

  @OneToMany(() => TaskHasFollower, (thf) => thf.task)
  task_has_followers?: TaskHasFollower[]

  @OneToMany(() => TaskInColumn, (tic) => tic.task)
  task_in_column?: TaskInColumn

  @OneToMany(() => TaskTodo, (todo) => todo.task, { onDelete: 'DEFAULT', onUpdate: 'DEFAULT' })
  task_todos?: TaskTodo[]

  @OneToMany(() => TaskComment, (comment) => comment.task, { cascade: true })
  task_comments?: TaskComment[]

  @OneToMany(() => TaskActivity, (activity) => activity.task, { cascade: true })
  task_activities?: TaskActivity[]

  @OneToMany(() => TaskFile, (todo) => todo.task, { cascade: true })
  task_files?: TaskFile[]

  @CreateDateColumn({ update: false })
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable({ name: 'task_has_tag' })
  tags: Tag[]
}
