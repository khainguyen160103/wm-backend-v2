import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string
}
