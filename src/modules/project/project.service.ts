import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Project, ProjectType } from './entities'
import { ProjectRepository } from './repository/project.repository'
import { randomColor } from 'src/utils'

const DefaultSprint = {
  name: 'Khởi tạo dự án',
  start_at: new Date(),
}

const DefaultBoard = {
  name: 'Bảng sơ cấp',
}

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(public repository: ProjectRepository) {
    super(repository)
  }

  async create(project: Project) {
    if (!project.sprints) project.sprints = [DefaultSprint as any]
    if (!project.color) project.color = randomColor()

    if (project.type === 'scrum') {
      project.boards = [DefaultBoard as any]
    }

    try {
      const result = await this.repository.create(project)

      await result.save()
      return await this.getById(result.id, { relations: ['sprints', 'boards', 'leader'] })
    } catch (error) {
      console.error(error)
    }
  }
}
