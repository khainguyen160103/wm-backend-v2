import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
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

  @Post('/list')
  @HttpCode(HttpStatus.OK)
  list(@Body() params?: { query: any; options?: any }): Promise<any> {
    return this.accountService.list(params.query, params.options)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: Account) {
    return this.accountService.update(dto.id, dto)
  }
}
