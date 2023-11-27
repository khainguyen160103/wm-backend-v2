import { EntityRepository, Repository } from 'typeorm'
import { TaskActivity } from '../entities'

@EntityRepository(TaskActivity)
export class TaskActivityRepository extends Repository<TaskActivity> {}
