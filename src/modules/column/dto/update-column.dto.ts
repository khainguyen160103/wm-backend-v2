import { IsNumber, IsString } from 'class-validator'

export class UpdateColumnDto {
  @IsNumber()
  column_id: number

  @IsString()
  name: string

  color?: string
}
