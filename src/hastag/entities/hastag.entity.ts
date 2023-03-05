import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

@Entity()
@Unique('code', ['code'])
export class Hastag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'code' })
  code: string

  @CreateDateColumn()
  created_at?: Date | string

  @UpdateDateColumn()
  updated_at?: Date | string
}
