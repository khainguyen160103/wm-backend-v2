import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get() {
    return this.taskService.getByCondition()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') taskId: number) {
    return this.taskService.getById(taskId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto as any)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: UpdateTaskDto) {
    return this.taskService.update(dto.id, dto as any)
  }
}
