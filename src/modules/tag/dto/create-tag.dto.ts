import { IsNotEmpty, IsString } from 'class-validator'
export class CreateTagDto { 
    @IsNotEmpty()
    @IsString()
    name: string 

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    project_id: number
}