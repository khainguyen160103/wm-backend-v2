import { Permission } from 'src/modules/permission/entities'
import { Project } from 'src/modules/project/entities'
import { Task, TaskComment, TaskHasFollower } from 'src/modules/task/entities'
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
export class 
Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'email', length: 50 })
  email: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'date_of_birth', nullable: true })
  date_of_birth?: Date

  @Column({ name: 'gender', type: 'tinyint', default: 0 })
  gender: number

  @Column({ name: 'phone', nullable: true })
  phone?: string

  @Column({ name: 'avatar', nullable: true })
  avatar?: string

  @Column({ name: 'color', length: 12 })
  color: string

  @ManyToMany(() => Permission, (permission) => permission.accounts, {})
  @JoinTable({ name: 'account_has_permissions' })
  permissions: Permission[]

  @OneToMany(() => Project, (project) => project.leader, { nullable: true })
  projects?: Project[]

  // tasks
  @OneToMany(() => Task, (task) => task.assignee, { nullable: true })
  task?: Task[]

  @OneToMany(() => TaskHasFollower, (thf) => thf.account, { nullable: true })
  task_has_followers?: TaskHasFollower[]

  @OneToMany(() => TaskComment, (comment) => comment.account, { onDelete: 'SET NULL', onUpdate: 'NO ACTION' })
  task_comments?: TaskComment[]

  @CreateDateColumn({ update: false })
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
