import { Account } from 'src/modules/account/entities'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name', length: 50 })
  name: string

  @Column({ name: 'description', type: 'longtext' })
  description: string

  @ManyToMany(() => Account, (account) => account.permissions, { cascade: true })
  accounts: Account[]
}
