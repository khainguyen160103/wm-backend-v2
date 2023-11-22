import { IsNotEmpty, IsString } from 'class-validator'
import { ProjectType } from '../entities'

export class UpdateProjectDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  @IsString()
  name?: string

  description?: string

  avatar?: string

  leader_id?: number

  sprints: any

  boards: any
}
