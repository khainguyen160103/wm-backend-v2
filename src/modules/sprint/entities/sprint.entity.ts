import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({ name: 'project_id' })
  project_id: number

  @Column({ name: 'start_at', type: 'date' })
  start_at?: Date | string

  @Column({ name: 'end_at', type: 'date' })
  end_at?: Date | string

  @Column({ name: 'goal', type: 'longtext' })
  goal: string

  @Column({ name: 'status', type: 'enum', enum: Object.values(SprintStatus), default: SprintStatus.NEW })
  status?: SprintStatus
}
