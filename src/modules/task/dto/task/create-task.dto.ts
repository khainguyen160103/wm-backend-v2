import { IsNotEmpty, IsString } from 'class-validator'
import { TaskInColumn } from '../../entities'

export class CreateTaskDto {
  @IsNotEmpty()
  sprint_id: number

  board_id: number

  @IsString()
  @IsNotEmpty()
  name: string

  task_in_column: TaskInColumn
}
