import { EntityRepository, Repository } from 'typeorm'
import { TaskFile } from '../entities'

@EntityRepository(TaskFile)
export class TaskFileRepository extends Repository<TaskFile> {}
