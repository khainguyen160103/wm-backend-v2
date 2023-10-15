import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Project } from './entities'
import { ProjectRepository } from './repository/project.repository'

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(public repository: ProjectRepository) {
    super(repository)
  }
}
