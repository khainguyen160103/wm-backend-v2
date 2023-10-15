import { Permission } from 'src/modules/permission/entities'
import { Project } from 'src/modules/project/entities'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  @Column({ name: 'color', length: 12 })
  color: string

  @ManyToMany(() => Permission, (permission) => permission.accounts, {})
  @JoinTable({ name: 'account_has_permissions' })
  permissions: Permission[]

  @OneToMany(() => Project, (project) => project.leader, { nullable: true })
  projects?: Project[]

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
