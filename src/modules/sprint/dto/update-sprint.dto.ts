import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateSprintDto {
  @IsNotEmpty()
  id: number

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  goal: string
}
