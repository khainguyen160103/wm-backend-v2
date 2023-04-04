import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { AtGuard } from 'src/common/guards'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  me(@GetCurrentUserId() userId: number) {
    console.log('me', userId)
    return 'me'
  }
}
