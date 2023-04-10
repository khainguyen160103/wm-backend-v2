import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column()
  path: string

  @Column({ nullable: true })
  mimetype?: string

  @Column()
  type: string

  @Column()
  size?: number

  @Column()
  created_by_id: number

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}
