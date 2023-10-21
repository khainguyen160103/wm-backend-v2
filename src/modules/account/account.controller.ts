import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { AccountService } from './account.service'
import { Account } from './entities'
import { ACCOUNT_SELECT_FIELDS } from 'src/constants/user.constants'

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@GetCurrentUserId() accountId: number) {
    if (!accountId) return null

    return this.accountService.getById(accountId, { select: ACCOUNT_SELECT_FIELDS })
  }

  @Get()
  getByCondition(query?: Account): Promise<Account[]> {
    return this.accountService.getByCondition(query)
  }
}
