import { Project } from 'src/modules/project/entities'
import { Task } from 'src/modules/task/entities'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'

export enum SprintStatus {
  NEW = 'new',
  DOING = 'doing',
  PENDING = 'pending',
  DONE = 'done',
}

@Entity()
export class Sprint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'project_id', nullable: true })
  project_id: number

  @ManyToOne(() => Project, (project) => project.sprints)
  project?: Project

  @Column({ name: 'start_at', type: 'datetime', nullable: true })
  start_at?: Date | string

  @Column({ name: 'end_at', type: 'datetime', nullable: true })
  end_at?: Date | string

  @Column({ name: 'goal', type: 'longtext', nullable: true })
  goal?: string

  @Column({ name: 'status', type: 'enum', enum: Object.values(SprintStatus), default: SprintStatus.NEW })
  status?: SprintStatus

  @OneToMany(() => Task, (task) => task.sprint, { cascade: true })
  tasks?: Task[]
}
