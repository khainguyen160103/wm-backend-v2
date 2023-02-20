import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PostStar {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}

@Entity()
export class PostUserStar {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({name: 'post_id'})
    post_id: number

    @Column({name: 'user_id'})
    user_id: number

    @Column({name: 'star', type: 'enum', default: PostStar.FIVE, enum: Object.values(PostStar)})
    star: PostStar | number

    @CreateDateColumn()
    created_at: Date | string

    @UpdateDateColumn()
    updated_at: Date | string
}