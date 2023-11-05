import { IsNotEmpty, IsString } from 'class-validator'
export class UpdateTagDto { 
    @IsNotEmpty() 
    id: number

}