import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Task } from './entities'
import { TaskRepository } from './repository/task.repository'

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(public repository: TaskRepository) {
    super(repository)
  }
}
