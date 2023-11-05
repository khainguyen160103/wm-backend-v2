import { Entity, Column as Col, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Task } from './task.entity'
import { Column } from 'src/modules/column/entities'

@Entity('task_in_column')
export class TaskInColumn {
  @ManyToOne(() => Column, (column) => column.task_in_column)
  column?: Column

  @Col({ name: 'column_id', primary: true })
  column_id: number

  @ManyToOne(() => Task, (task) => task.task_in_column)
  task?: Task

  @Col({ name: 'task_id', primary: true })
  task_id: number

  @Col({ name: 'order?', default: 0 })
  order?: number

  @UpdateDateColumn()
  updated_at?: Date | string
}
