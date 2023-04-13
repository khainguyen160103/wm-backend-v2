import { Injectable } from '@nestjs/common'
import { PostUser } from './entities'
import { BaseService } from 'libs/services/base.service'
import { SavePostDto } from './dto'
import { PostUserRepository } from './repository/post_user.repository'

@Injectable()
export class PostUserService extends BaseService<PostUser> {
  constructor(private repository: PostUserRepository) {
    super(repository)
  }

  async like(params: SavePostDto) {
    // const isLike = await this
    return true
  }
}
