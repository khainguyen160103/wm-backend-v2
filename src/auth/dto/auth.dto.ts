import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Min(8)
  @Max(16)
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
  @Min(8)
  @Max(16)
  password: string
}
