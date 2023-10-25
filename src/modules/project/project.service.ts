import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Project, ProjectType } from './entities'
import { ProjectRepository } from './repository/project.repository'
import { randomColor } from 'src/utils'

const DefaultSprint = {
  name: 'Giai đoạn khởi tạo',
  start_at: new Date(),
}

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(public repository: ProjectRepository) {
    super(repository)
  }

  async create(project: Project) {
    if (!project.sprints) project.sprints = [DefaultSprint as any]
    if (!project.color) project.color = randomColor()

    try {
      const result = await this.repository.create(project)

      return result.save()
    } catch (error) {
      console.error(error)
    }
  }
}
