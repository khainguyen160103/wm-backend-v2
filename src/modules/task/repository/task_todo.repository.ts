import { EntityRepository, Repository } from 'typeorm'
import { TaskTodo } from '../entities'

@EntityRepository(TaskTodo)
export class TaskTodoRepository extends Repository<TaskTodo> {}
