import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@GetCurrentUserId() userId: number) {
    if (!userId) return null

    return this.userService.getById(userId)
  }
}
