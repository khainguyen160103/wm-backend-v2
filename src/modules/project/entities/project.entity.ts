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
} from 'typeorm'

export enum ProjectType {
  SCRUM = 'scrum',
  KANBAN = 'kanban',
}

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'description', type: 'longtext', nullable: true })
  description?: string

  @Column({ name: 'avatar', nullable: true })
  avatar?: number

  @Column({ name: 'type', type: 'enum', enum: Object.values(ProjectType), default: ProjectType.KANBAN })
  type: ProjectType

  @Column({ name: 'color', length: 12 })
  color: string

  @Column({ name: 'leader_id' })
  leader_id?: number

  @ManyToOne(() => Account, (account) => account.projects, { nullable: true })
  leader?: Account

  @OneToMany(() => Board, (board) => board.project, { cascade: true })
  boards?: Board[]

  @OneToMany(() => Sprint, (sprint) => sprint.project, { cascade: true })
  sprints?: Sprint[]

  @CreateDateColumn({ update: false })
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
