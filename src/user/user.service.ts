import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { User } from './entities'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService extends BaseService<User> {
  constructor(public repository: UserRepository) {
    super(repository)
  }

  async getByEmail(params: { email: string }): Promise<User> {
    try {
      const { email } = params

      const user = await this.repository.findOne({ where: { email } })

      return user
    } catch (error) {
      throw error
    }
  }
}
