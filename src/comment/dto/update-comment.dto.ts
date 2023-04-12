import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Media } from 'src/media/entities'

export class UpdateCommentDto {
  @IsNumber()
  id: any

  @IsString()
  @IsOptional()
  content: string

  @IsNumber()
  post_id: number

  medias?: Media[]
}
