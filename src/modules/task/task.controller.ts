import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities'

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get() {
    return await this.taskService.getByCondition()
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') taskId: number) {
    return await this.taskService.getById(taskId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto) {
    return await this.taskService.create(dto as Task)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateTaskDto) {
    return await this.taskService.update(dto.id, dto as any)
  }

  @Delete('/:task_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('task_id') id: number) {
    return await this.taskService.delete(id)
  }
}
