import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'description', type: 'longtext' })
  description: string

  @Column({ name: 'assignee_id' })
  assignee_id: number

  @Column({ name: 'sprint_id' })
  sprint_id?: number

  @Column({ name: 'board_id' })
  board_id?: number

  @Column({ name: 'due_date', type: 'date' })
  due_date?: Date | string

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
