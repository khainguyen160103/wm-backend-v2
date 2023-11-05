import { IsNotEmpty, IsOptional ,IsString } from 'class-validator'
export class UpdateSprintdto{ 
    @IsNotEmpty()
    id: number

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    goal: string
}