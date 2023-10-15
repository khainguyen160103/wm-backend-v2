import { EntityRepository, Repository } from 'typeorm'
import { Project } from '../entities'

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
