import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsNotEmpty()
  id: number

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  assignee_id?: string

  @IsString()
  @IsOptional()
  due_date?: string
}
