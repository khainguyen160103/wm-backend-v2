import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskComment } from '../entities'
import { TaskCommentRepository } from '../repository'

@Injectable()
export class TaskCommentService extends BaseService<TaskComment> {
  constructor(public repository: TaskCommentRepository) {
    super(repository)
  }
}
