import { Injectable } from '@nestjs/common'
import { Post } from './entities'
import { BaseService } from 'libs/services/base.service'
import { PostRepository } from './repository'
import { SavePostDto } from './dto'
import { PostUserRepository } from './repository/post_user.repository'

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(private repository: PostRepository, private postUserRepository: PostUserRepository) {
    super(repository)
  }

  async test(query: any) {
    const posts = await this.repository.find({ where: { ...query } })
    return posts
  }

  async save(params: { user_id: number; post_id: number }) {
    const { user_id, post_id } = params
    const postUser = await this.postUserRepository.findOne({ where: { user_id, post_id } })

    if (postUser) {
      const isSave = postUser.is_save

      await this.postUserRepository.update(postUser.id, { is_save: !isSave })
    } else {
      const c = await this.postUserRepository.create({ user_id, post_id, is_save: true })
      await c.save()
    }

    return await this.postUserRepository.findOne({ where: { user_id, post_id } })
  }
}
