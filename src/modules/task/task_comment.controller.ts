import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskCommentService } from './task_comment.service'
import { CreateCommentTaskDto } from './dto/create-commentTask.dto'
import { GetCurrentUserId } from 'src/common/decorators'
import { UpdateCommentTaskDto } from './dto/update-comment.dto'

@Controller('task/comment')
export class TaskCommentController {
  constructor(private taskCommentService: TaskCommentService) {}

  // url: {{api}}/task/comment/:task_id
  @Get('/:task_id')
  @HttpCode(HttpStatus.OK)
  async getComment(@Param('task_id') task_id: number) {
    return await this.taskCommentService.getByCondition({ task_id })
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async  createComment(@Body() dto: CreateCommentTaskDto, @GetCurrentUserId() accountId: number) {
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
    return await this.taskCommentService.update(task_comment_id, { content })
  }

  @Delete('/:task_comment_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param("task_comment_id") task_comment_id: number) { 
    return await this.taskCommentService.delete(task_comment_id)
  }
}
