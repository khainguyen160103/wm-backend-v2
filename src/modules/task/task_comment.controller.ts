import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskCommentService } from './task_comment.service'

@Controller('task/comment')
export class TaskController {
  constructor(private taskCommentService: TaskCommentService) {}

  // url: {{api}}/task/comment/:task_id
  @Get('/:task_id')
  async getComment(@Param(':task_id') task_id: number) {
    return await this.taskCommentService.getByCondition({ task_id })
  }
}
