import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Param, Delete } from '@nestjs/common'
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

    return this.accountService.getById(accountId, { select: ACCOUNT_SELECT_FIELDS, relations: ['permissions'] })
  }

  @Get()
  getByCondition(): Promise<Account[]> {
    return this.accountService.getByCondition({}, { relations: ['permissions'] })
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  list(@Body() params?: { query: any; options?: any }): Promise<any> {
    return this.accountService.list(params.query, params.options)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: Account) {
    if (dto.permissions?.length) {
      await this.accountService.update(dto.id, { permissions: [] }) // delete permission then re update
    }
    return this.accountService.update(dto.id, dto, { relations: ['permissions'] })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number) {
    return this.accountService.delete(id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: number) {
    return this.accountService.getById(id, { relations: ['permissions'] })
  }
}
