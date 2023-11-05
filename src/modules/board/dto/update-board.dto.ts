import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateBoardDto  { 
    @IsNotEmpty()
    id: number

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    icon: string
}