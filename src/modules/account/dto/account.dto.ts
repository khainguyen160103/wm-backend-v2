import { IsNotEmpty, IsEmail } from 'class-validator'
import { Permission } from 'src/modules/permission/entities'

export class UpdateAccountDto {
  @IsNotEmpty()
  id?: number

  @IsNotEmpty()
  @IsEmail()
  email?: string

  @IsNotEmpty()
  name?: string

  @IsNotEmpty()
  date_of_birth?: Date

  @IsNotEmpty()
  gender?: number

  @IsNotEmpty()
  phone?: string

  @IsNotEmpty()
  avatar?: string

  @IsNotEmpty()
  permissions?: Permission[]
}
