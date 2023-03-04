import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/user.dto'
import { User } from './entities'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>
  ) {}

  async create(params: CreateUserDto) {
    return this.repository.create(params)
  }
}
