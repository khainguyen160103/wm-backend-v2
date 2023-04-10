import { Injectable } from '@nestjs/common'
import { Post } from './entities'
import { BaseService } from 'libs/services/base.service'
import { PostRepository } from './repository'

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(private repository: PostRepository) {
    super(repository)
  }

  async test(query: any) {
    const posts = await this.repository.find({ where: { ...query } })
    return posts
  }
}
