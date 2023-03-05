import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Hastag } from './entities'
import { HastagRepository } from './repository/hastag.repository'

@Injectable()
export class HastagService extends BaseService<Hastag> {
  constructor(public repository: HastagRepository) {
    super(repository)
  }
}
