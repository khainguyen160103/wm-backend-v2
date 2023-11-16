import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskTodoRepository } from '../repository'
import { TaskTodo } from '../entities'

@Injectable()
export class TaskTodoService extends BaseService<TaskTodo> {
  constructor(public repository: TaskTodoRepository) {
    super(repository)
  }
}
