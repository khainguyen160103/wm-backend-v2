import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'description', type: 'longtext' })
  description: string
}
