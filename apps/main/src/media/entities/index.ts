import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'url' })
  url: string

  @Column({ name: 'size', nullable: true })
  size?: number

  @Column({ name: 'created_by_id' })
  created_by_id: number

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}
