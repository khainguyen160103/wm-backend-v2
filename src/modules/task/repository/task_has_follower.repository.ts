import { EntityRepository, Repository } from 'typeorm'
import { TaskHasFollower } from '../entities'

@EntityRepository(TaskHasFollower)
export class TaskHasFollowerRepository extends Repository<TaskHasFollower> {}
