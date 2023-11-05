import { IsNotEmpty } from 'class-validator'
export class UpdateSprintdto{ 
    @IsNotEmpty()
    id: number
}