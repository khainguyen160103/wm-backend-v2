import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto, UpdateProjectDto } from './dto'
import { Project } from './entities'
import { TaskService } from '../task/service/task.service'
import { TaskHasFollowerService } from '../task/service/task_has_follower.service'
import { GetCurrentUserId } from 'src/common/decorators'
import { In } from 'typeorm'

@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private taskHasFollowerService: TaskHasFollowerService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto as any)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: UpdateProjectDto) {
    return this.projectService.update(dto.id, dto as any, { relations: ['sprints', 'boards', 'leader'] })
  }

  @Post('my')
  @HttpCode(HttpStatus.OK)
  async get(@GetCurrentUserId() accountId: number, @Body() params: { query?: any; options?: any }) {
    const query: any = params.query || {}
    const payload: any = {}
    if (query.leader_id) payload.leader_id = query.leader_id
    let projectIds: number[] = []
    if (!query.is_leader) {
      projectIds = await this.projectService.getProjectIn(accountId)
    }

    return this.projectService.getByCondition(
      { ...payload, ...(!query.is_leader ? { id: In(projectIds) } : {}) },
      {
        relations: ['leader', 'sprints'],
        order: {
          created_at: 'DESC',
        },
      }
    )
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: number) {
    return this.projectService.getById(id, { relations: ['sprints', 'boards'] })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.projectService.delete(id)
  }
}
