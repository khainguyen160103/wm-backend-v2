import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { GetCurrentUserId } from 'src/common/decorators'
import { TaskService } from '../service/task.service'
import { TaskInColumnService } from '../service/task_in_column.service'
import { AssignTaskDto, ChangeTaskColumnDto, CreateTaskDto, UpdateTaskDto } from '../dto'
import { TaskTodoService } from '../service/task_todo.service'
import { TaskCommentService } from '../service/task_comment.service'
import { TaskFileService } from '../service/task_file.service'
import { TaskHasFollowerService } from '../service/task_has_follower.service'
import { AccountService } from 'src/modules/account/account.service'

@Controller('task')
export class TaskController {
  constructor(
    private accountService: AccountService,
    private taskService: TaskService,
    private taskInColumnService: TaskInColumnService,
    private taskTodoService: TaskTodoService,
    private taskCommentService: TaskCommentService,
    private taskFileService: TaskFileService,
    private taskHasFollowerService: TaskHasFollowerService,
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
        select: ['task_in_column', 'id', 'name', 'assignee_id', 'updated_at', 'due_date', 'board_id'],
      }
    )
  }

  @Post('statsTaskColumn')
  @HttpCode(HttpStatus.FOUND)
  async statsTaskColumn(@Body() dto: { sprint_id: number }) {
    return await this.taskService.statsTaskColumn(dto.sprint_id)
  }

  @Post('statsTaskTag')
  @HttpCode(HttpStatus.FOUND)
  async statsTaskTag(@Body() dto: { sprint_id: number }) {
    return await this.taskService.statsTaskTag(dto.sprint_id)
  }

  @Post('statsTaskAccount')
  @HttpCode(HttpStatus.FOUND)
  async statsTaskAccount(@Body() dto: { sprint_id: number }) {
    return await this.taskService.statsTaskAccount(dto.sprint_id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') taskId: number) {
    const task = await this.taskService.getById(taskId, {
      relations: ['task_in_column', 'tags', 'assignee', 'task_has_followers'],
    })

    if (task.task_has_followers?.length) {
      const accountIds = task.task_has_followers.map((thf) => thf.account_id)
      const accounts = await this.accountService.getByIds({ ids: accountIds })
      task.task_has_followers.forEach((thf) => {
        thf.account = accounts.find((account) => account.id === thf.account_id)
      })
    }

    return task
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
    await this.taskHasFollowerService.updateMany(dto.task_has_followers)

    delete dto.task_has_followers
    await this.taskService.update(dto.id, dto as any, {
      relations: ['task_in_column', 'tags', 'assignee', 'task_has_followers'],
    })

    return await this.getOne(dto.id)
  }

  @Delete('/:task_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('task_id') id: number) {
    const task = await this.getOne(id)
    const promises = []

    if (task.task_in_column) {
      promises.push(() => {
        this.taskInColumnService.delete(task.id)
      })
    }

    if (task.task_todos?.length) {
      task.task_todos.forEach((todo) => {
        promises.push(() => {
          this.taskTodoService.delete(todo.id)
        })
      })
    }

    if (task.task_comments?.length) {
      task.task_comments.forEach((comment) => {
        promises.push(() => {
          this.taskCommentService.delete(comment.id)
        })
      })
    }

    if (task.task_files?.length) {
      task.task_files.forEach((file) => {
        promises.push(() => {
          this.taskFileService.delete(file.id)
        })
      })
    }

    await Promise.all(promises.map((promise) => promise()))
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
