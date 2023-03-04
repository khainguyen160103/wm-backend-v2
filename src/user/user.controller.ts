import { Controller, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() params: CreateUserDto) {
    return this.userService.create(params)
  }
}
