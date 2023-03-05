import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { User } from './entities'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService extends BaseService<User> {
  constructor(public repository: UserRepository) {
    super(repository)
  }
}
