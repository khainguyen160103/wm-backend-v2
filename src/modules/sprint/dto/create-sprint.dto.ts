import { IsString , IsNotEmpty, IsEnum} from 'class-validator'
export class CreateSprintDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    project_id: number

    @IsString()
    @IsNotEmpty()
    goal: string
  
}