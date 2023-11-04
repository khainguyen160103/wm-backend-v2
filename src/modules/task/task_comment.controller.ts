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
  // url: {{api}}/task/comment
  @Post()
  @HttpCode(HttpStatus.CREATED)
   createComment(@Body() dto : CreateCommentTaskDto , @GetCurrentUserId() accountId : number) { 
    return this.taskCommentService.createComment(dto as any , accountId)
  }
  

}
