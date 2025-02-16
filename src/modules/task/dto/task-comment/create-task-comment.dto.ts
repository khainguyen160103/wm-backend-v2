import { IsNotEmpty, IsString } from 'class-validator'
export class CreateCommentTaskDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  task_id: number

  @IsNotEmpty()
  project_id: number
}
