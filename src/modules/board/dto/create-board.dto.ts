import { IsNotEmpty, IsString } from 'class-validator'
export class CreateBoardDto { 
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    project_id: number

    @IsNotEmpty()
    icon: string
}