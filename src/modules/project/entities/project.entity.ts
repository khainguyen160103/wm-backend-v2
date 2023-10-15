import { Account } from 'src/modules/account/entities'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
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

  @Column({ name: 'description', type: 'longtext' })
  description?: string

  @Column({ name: 'avatar' })
  avatar: number

  @Column({ name: 'type', type: 'enum', enum: Object.values(ProjectType), default: ProjectType.KANBAN })
  type: number

  @Column({ name: 'color', length: 12 })
  color: string

  @Column({ name: 'leader_id' })
  leader_id?: number

  @ManyToOne(() => Account, (account) => account.projects, { nullable: true })
  leader: Account

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
