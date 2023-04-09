import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'avatar', nullable: true })
  avatar?: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password?: string

  /** Check disabled user*/
  @Column({ name: 'is_disabled', type: 'boolean', default: 0 })
  is_disabled?: boolean

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
