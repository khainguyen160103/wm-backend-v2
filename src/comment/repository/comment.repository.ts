import { EntityRepository, Repository } from 'typeorm'
import { Comment } from '../entities'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
