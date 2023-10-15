import { Project } from 'src/modules/project/entities'
import { Task } from 'src/modules/task/entities'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'icon', length: 50 })
  icon?: string

  @Column({ name: 'project_id' })
  project_id: number

  @ManyToOne(() => Project, (project) => project.boards)
  project?: Project

  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  tasks?: Task[]
}
