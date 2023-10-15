import { BaseEntity, Column as Col, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
