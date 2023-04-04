import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'username', nullable: true })
  username?: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password?: string

  @Column({ name: 'refresh_token', nullable: true })
  refresh_token?: string

  /** Check disabled user*/
  @Column({ name: 'is_disabled', type: 'boolean', default: 0 })
  is_disabled?: boolean

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
