import { IsNumber } from 'class-validator'

export class SavePostDto {
  @IsNumber()
  post_id
}
