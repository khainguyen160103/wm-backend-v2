import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TaskTodoService } from './task_todo.service'
import { CreateTaskTodoDto, UpdateTaskTodoDto } from './dto'

@Controller('task/todo')
export class TaskTodoController {
  constructor(private taskTodoService: TaskTodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskTodoDto) {
    const { content, task_id, is_checked } = dto

    return await this.taskTodoService.create({
      content,
      task_id,
      is_checked,
    })
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateTaskTodoDto) {
    const { content, task_id, is_checked, id } = dto
    return await this.taskTodoService.update(id, { content, task_id, is_checked })
  }

  @Delete('/:todo_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('todo_id') todo_id: number) {
    return await this.taskTodoService.delete(todo_id)
  }
}
