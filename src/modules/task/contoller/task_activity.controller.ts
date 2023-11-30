import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskActivityService } from '../service/task_activity.service'

@Controller('task/activity')
export class TaskActivityController {
  constructor(private taskActivityService: TaskActivityService) {}

  // url: {{api}}/task/comment/:task_id
  @Get('/:task_id')
  @HttpCode(HttpStatus.OK)
  async getTaskActivity(@Param('task_id') task_id: number) {
    return await this.taskActivityService.getByCondition({ task_id })
  }

  @Get('my')
  @HttpCode(HttpStatus.OK)
  async getMyActivity() {
    return await this.taskActivityService.getByCondition({})
  }
}
