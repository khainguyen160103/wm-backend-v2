import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ProjectType } from '../entities'

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  avatar?: string

  @IsNotEmpty()
  @IsString()
  type: ProjectType

  @IsNotEmpty()
  leader_id: number
}
