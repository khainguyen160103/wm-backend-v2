import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { UserService } from './user.service'
import { User } from './entities'
import { USER_SELECT_FIELDS } from 'src/constants/user.constants'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@GetCurrentUserId() userId: number) {
    if (!userId) return null

    return this.userService.getById(userId, { select: USER_SELECT_FIELDS })
  }

  @Get()
  getByCondition(query?: User): Promise<User[]> {
    return this.userService.getByCondition(query)
  }
}
