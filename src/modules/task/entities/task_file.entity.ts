import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class TaskFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'task_id' })
  task_id: number

  @Column({ name: 'type' })
  type?: string

  @UpdateDateColumn()
  updated_at?: Date | string
}
