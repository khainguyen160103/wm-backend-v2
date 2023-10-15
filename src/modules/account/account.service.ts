import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { In } from 'typeorm'
import { Account } from './entities'
import { AccountRepository } from './repository/account.repository'
import { USER_SELECT_FIELDS } from 'src/constants/user.constants'

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(public repository: AccountRepository) {
    super(repository)
  }

  async getByEmail(params: { email: string }): Promise<Account> {
    try {
      const { email } = params

      const user = await this.repository.findOne({ where: { email } })

      return user
    } catch (error) {
      throw error
    }
  }

  async getByIds(params: { ids: number[] }): Promise<Account[]> {
    const { ids } = params

    const users = await this.repository.find({ where: { id: In([...ids]) }, select: USER_SELECT_FIELDS as any })

    return users
  }
}
