import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto, UpdateProjectDto } from './dto'
import { Project } from './entities'
import { TaskService } from '../task/service/task.service'

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService, private taskService: TaskService) {}

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
  get(@Body() params: { query?: Project; options?: any }) {
    const query: any = params.query || {}
    const payload: any = {}
    if (query.leader_id) payload.leader_id = query.leader_id
    return this.projectService.getByCondition(
      { ...payload },
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
