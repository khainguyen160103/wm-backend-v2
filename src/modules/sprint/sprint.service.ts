import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Sprint } from './entities'
import { SprintRepository } from './repository/sprint.repository'

@Injectable()
export class SprintService extends BaseService<Sprint> {
  constructor(public repository: SprintRepository) {
    super(repository)
  }
}
