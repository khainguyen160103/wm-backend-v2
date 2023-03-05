import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Comment } from './entities'
import { CommentRepository } from './repository/comment.repository'

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(private repository: CommentRepository) {
    super(repository)
  }
}
