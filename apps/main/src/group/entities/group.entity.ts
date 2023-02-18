import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('code', ['code'])
export class Group {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({name: 'name'})
    name: string

    @Column({name: 'code'})
    code: string
}