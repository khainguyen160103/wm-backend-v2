import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Media } from 'src/media/entities'

export class CreateCommentDto {
  @IsString()
  content: string

  @IsNumber()
  post_id: number

  @IsOptional()
  @IsNumber()
  parent_id?: number

  medias?: Media[]
}
