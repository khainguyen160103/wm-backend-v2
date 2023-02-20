import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id?: string

    @Column({name: 'content', type: 'mediumtext'})
    content: string

    @Column({name: 'post_id'})
    post_id: number

    /* id của commnent cha*/
    @Column({name: 'parent_id'})
    parent_id?: number

    @Column({name: 'created_by_id'})
    created_by_id: number

    @CreateDateColumn()
    created_at: Date | string

    @UpdateDateColumn()
    updated_at: Date | string
}