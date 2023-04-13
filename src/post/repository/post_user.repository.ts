import { EntityRepository, Repository } from 'typeorm'
import { PostUser } from '../entities'

@EntityRepository(PostUser)
export class PostUserRepository extends Repository<PostUser> {}
