import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskActivity } from '../entities'
import { TaskActivityRepository } from '../repository'

@Injectable()
export class TaskActivityService extends BaseService<TaskActivity> {
  constructor(public repository: TaskActivityRepository) {
    super(repository)
  }
}
