import { EntityRepository, Repository } from 'typeorm'
import { TaskComment } from '../entities'

@EntityRepository(TaskComment)
export class TaskCommentRepository extends Repository<TaskComment> {}
