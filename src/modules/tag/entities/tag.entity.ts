import { Task } from 'src/modules/task/entities'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'color', length: 12 })
  color: string

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[]
}
