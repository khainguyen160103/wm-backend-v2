import { EntityRepository, Repository } from 'typeorm'
import { TaskInColumn } from '../entities/task_in_column.entity'

@EntityRepository(TaskInColumn)
export class TaskInColumnRepository extends Repository<TaskInColumn> {}
