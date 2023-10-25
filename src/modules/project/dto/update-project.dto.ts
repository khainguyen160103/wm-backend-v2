import { IsNotEmpty, IsString } from 'class-validator'
import { ProjectType } from '../entities'

export class UpdateProjectDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  @IsString()
  name?: string

  @IsString()
  description?: string

  @IsString()
  avatar?: string

  @IsNotEmpty()
  @IsString()
  type?: ProjectType

  @IsNotEmpty()
  leader_id: number
}
