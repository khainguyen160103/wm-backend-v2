import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskComment } from './entities'
import { TaskCommentRepository } from './repository'
import { CreateCommentTaskDto } from './dto/task-comment/create-task-comment.dto'
import {} from '../../utils/user'

@Injectable()
export class TaskCommentService extends BaseService<TaskComment> {
  constructor(public repository: TaskCommentRepository) {
    super(repository)
  }
}
