import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { TaskService } from './task.service'
import { AssignTaskDto, ChangeTaskColumnDto, CreateTaskDto } from './dto'
import { UpdateTaskDto } from './dto/task/update-task.dto'
import { TaskInColumnService } from './task_in_column.service'
import { GetCurrentUserId } from 'src/common/decorators'

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private taskInColumnService: TaskInColumnService,
    private eventEmitter: EventEmitter2
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query() query: { sprint_id: number; board_id?: number }) {
    return await this.taskService.getByCondition(
      {
        sprint_id: query.sprint_id,
        ...(query.board_id ? { board_id: query.board_id } : {}),
      },
      {
        relations: ['task_in_column', 'tags', 'assignee'],
        select: ['id', 'name', 'assignee_id', 'updated_at', 'due_date'],
      }
    )
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') taskId: number) {
    return await this.taskService.getById(taskId, { relations: ['task_in_column', 'tags', 'assignee'] })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto) {
    const task = await this.taskService.create({
      name: dto.name,
      sprint_id: dto.sprint_id,
      board_id: dto.board_id,
    })

    const taskInColumn = await this.taskInColumnService.create({ column_id: 1, task_id: task.id, order: 0 })
    task.task_in_column = taskInColumn
    return task
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  async assign(@GetCurrentUserId() accountId: number, @Body() dto: AssignTaskDto) {
    const task = await this.taskService.update(
      dto.task_id,
      {
        assignee_id: dto.assignee_id,
      },
      { relations: ['assignee'] }
    )

    this.eventEmitter.emit('task.assign', { account_id: accountId, task })

    return task
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateTaskDto) {
    return await this.taskService.update(dto.id, dto as any, { relations: ['task_in_column', 'tags', 'assignee'] })
  }

  @Delete('/:task_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('task_id') id: number) {
    return await this.taskService.delete(id)
  }

  @Post('change-column')
  @HttpCode(HttpStatus.OK)
  async changeColumn(@Body() dto: ChangeTaskColumnDto[]) {
    const promises = []
    dto.forEach((item) => {
      promises.push(() => this.taskInColumnService.changeOrder(item))
    })

    await Promise.all(promises.map((promise) => promise()))
    return true
  }
}
