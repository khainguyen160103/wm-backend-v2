import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Post } from './entities'

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) repository) {
    super(repository)
  }
}
