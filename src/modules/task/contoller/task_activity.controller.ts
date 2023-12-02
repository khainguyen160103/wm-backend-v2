import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskActivityService } from '../service/task_activity.service'
import { TaskService } from '../service/task.service'
import { GetCurrentUserId } from 'src/common/decorators'
import { In } from 'typeorm'

@Controller('task/activity')
export class TaskActivityController {
  constructor(private taskActivityService: TaskActivityService, private taskService: TaskService) {}

  // url: {{api}}/task/comment/:task_id
  @Post('find')
  @HttpCode(HttpStatus.OK)
  async getTaskActivity(@Body() dto: { task_id: number }) {
    return await this.taskActivityService.getByCondition(
      { task_id: dto.task_id },
      {
        order: {
          updated_at: 'DESC',
        },
      }
    )
  }

  @Get('my')
  @HttpCode(HttpStatus.OK)
  async getMyActivity(@GetCurrentUserId() accountId: number) {
    const taskIds = await this.taskService.getTaskIn(accountId)
    return await this.taskActivityService.getByCondition(
      { task_id: In(taskIds) },
      {
        order: {
          updated_at: 'DESC',
        },
      }
    )
  }
}
