import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'email', length: 50 })
  email: string

  @Column({ name: 'password', length: 12 })
  password: string

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'date_of_birth' })
  date_of_birth: Date

  @Column({ name: 'gender', type: 'tinyint' })
  gender: number

  @Column({ name: 'phone' })
  phone: number

  @Column({ name: 'avatar' })
  avatar: string

  @Column({ name: 'color', length: '12' })
  color: string

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
