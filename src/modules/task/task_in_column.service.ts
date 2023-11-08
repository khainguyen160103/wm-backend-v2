import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskInColumnRepository } from './repository'
import { TaskInColumn } from './entities'

@Injectable()
export class TaskInColumnService extends BaseService<TaskInColumn> {
  constructor(public repository: TaskInColumnRepository) {
    super(repository)
  }
}
