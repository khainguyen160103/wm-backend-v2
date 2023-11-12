import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateTagDto {
  @IsNotEmpty()
  id: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  color: string
}
