import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'code' })
  code: string

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}
