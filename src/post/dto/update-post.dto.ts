import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdatePostDto {
  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsNotEmpty()
  content?: string
}
