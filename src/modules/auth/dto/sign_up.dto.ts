import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  name?: string

  gender?: number

  date_of_birth?: string

  phone?: string
}
