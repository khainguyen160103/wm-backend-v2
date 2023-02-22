import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostUserSave {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({name: 'post_id'})
    post_id: number

    @Column({name: 'user_id'})
    user_id: number

    @CreateDateColumn()
    created_at: Date | string

    @UpdateDateColumn()
    updated_at: Date | string
}