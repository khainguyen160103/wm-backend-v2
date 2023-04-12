import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string

  @IsString()
  name?: string
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string
}
