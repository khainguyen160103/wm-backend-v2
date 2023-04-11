import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { BaseServiceOptions } from 'libs/services/types/options.types'
import { BaseOptions } from 'vm'
import { User } from './entities'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService extends BaseService<User> {
  constructor(public repository: UserRepository) {
    super(repository)
  }

  // async getById(id: string | number, options?: BaseServiceOptions): Promise<User> {
  //   try {
  //     const user = await this.repository.get(id)
  //     if (!user) return null
  //     // if (user.password) delete user.password

  //     return user
  //   } catch (error) {
  //     throw error
  //   }
  // }
}
