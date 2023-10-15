import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Tag } from './entities'
import { TagRepository } from './repository/tag.repository'

@Injectable()
export class TagService extends BaseService<Tag> {
  constructor(public repository: TagRepository) {
    super(repository)
  }
}
