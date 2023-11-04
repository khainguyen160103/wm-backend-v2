import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskCommentService } from './task_comment.service'
import { CreateCommentTaskDto } from './dto/create-commentTask.dto'
import { GetCurrentUserId } from 'src/common/decorators'

@Controller('task/comment')
export class TaskCommentController {
  constructor(private taskCommentService: TaskCommentService) {}

  // url: {{api}}/task/comment/:task_id
  @Get('/:task_id')
  @HttpCode(HttpStatus.OK)
  async getComment(@Param(':task_id') task_id: number) {
    return await this.taskCommentService.getByCondition({ task_id })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body() dto: CreateCommentTaskDto, @GetCurrentUserId() accountId: number) {
    const { content, task_id } = dto

    return this.taskCommentService.create({
      task_id,
      content,
      account_id: accountId,
    })
  }
}
