import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto, UpdateProjectDto } from './dto'
import { Project } from './entities'

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto as any)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: UpdateProjectDto) {
    return this.projectService.update(dto.id, dto as any)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  get(@Body() params: { query?: Project; options?: any }) {
    return this.projectService.getByCondition(params.query, {
      relations: ['leader'],
    })
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: number) {
    return this.projectService.getById(id, { relations: ['sprints'] })
  }
}
