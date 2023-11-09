import { IsNotEmpty } from 'class-validator'

export class AssignTaskDto {
  @IsNotEmpty()
  task_id: number

  @IsNotEmpty()
  assignee_id: number
}
