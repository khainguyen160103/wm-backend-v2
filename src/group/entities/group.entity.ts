import { User } from 'src/user/entities'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

@Entity()
@Unique('code', ['code'])
export class Group {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'code' })
  code: string

  @ManyToMany(() => User)
  @JoinTable({name: 'group_users'})
  users: User[]

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
