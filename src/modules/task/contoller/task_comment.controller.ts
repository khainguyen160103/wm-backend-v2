import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskCommentService } from '../service/task_comment.service'
import { GetCurrentUserId } from 'src/common/decorators'
import { CreateCommentTaskDto, UpdateCommentTaskDto } from '../dto'
import { AccountService } from 'src/modules/account/account.service'

@Controller('task/comment')
export class TaskCommentController {
  constructor(private taskCommentService: TaskCommentService) {}

  // url: {{api}}/task/comment/:task_id
  @Get('/:task_id')
  @HttpCode(HttpStatus.OK)
  async getComment(@Param('task_id') task_id: number) {
    return await this.taskCommentService.getByCondition({ task_id }, { relations: ['account'] })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: CreateCommentTaskDto, @GetCurrentUserId() accountId: number) {
    const { content, task_id } = dto

    return await this.taskCommentService.create({
      task_id,
      content,
      account_id: accountId,
    })
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateCommentTaskDto, @GetCurrentUserId() accountId: number) {
    const { content, task_comment_id } = dto
    return await this.taskCommentService.update(task_comment_id, { content }, { relations: ['account'] })
  }

  @Delete('/:task_comment_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('task_comment_id') task_comment_id: number) {
    return await this.taskCommentService.delete(task_comment_id)
  }
}
