import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskComment } from './entities'
import { TaskCommentRepository } from './repository'
import { CreateCommentTaskDto} from './dto/create-commentTask.dto'
import { } from '../../utils/user'
@Injectable()
export class TaskCommentService extends BaseService<TaskComment> {
  constructor(public repository: TaskCommentRepository) {
    super(repository)
  }
  async createComment(dto: CreateCommentTaskDto, accountId : number) {
    const {content , task_id}= dto;
    try {
      const result = this.repository.create({ 
        content, 
        task_id, 
        account_id : accountId
      })
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
