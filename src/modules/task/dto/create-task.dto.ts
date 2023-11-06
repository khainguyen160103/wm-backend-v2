import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  sprint_id: number

  board_id: number

  @IsString()
  @IsNotEmpty()
  name: string
}
