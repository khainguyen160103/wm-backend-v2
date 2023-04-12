import { IsNotEmpty, IsString } from 'class-validator'
import { Category } from 'src/category/entities'
import { Media } from 'src/media/entities'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  content: string

  medias?: Media[]

  category?: Category
}
