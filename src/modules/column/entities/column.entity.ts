import { TaskInColumm } from 'src/modules/task/entities/task_in_column.entity'
import { BaseEntity, Column as Col, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Column extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Col({ name: 'name', length: 50 })
  name: string

  @Col({ name: 'project_id' })
  project_id: number

  @Col({ name: 'color' })
  color?: string

  @Col({ name: 'order', default: 0 })
  order: number

  @OneToMany(() => TaskInColumm, (tic) => tic.column, { nullable: true })
  task_in_column?: TaskInColumm[]
}
