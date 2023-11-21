import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Task } from '../entities'
import { TaskRepository } from '../repository/task.repository'

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(public repository: TaskRepository) {
    super(repository)
  }

  async statsTaskColumn(sprint_id: number) {
    if (!sprint_id) sprint_id = 1
    return await this.repository.query(
      'select count(task.id) as count , column.name , column.id , column.color ' +
        'from `task` join `task_in_column` on task.id = task_in_column.task_id ' +
        'join `column` on task_in_column.column_id = column.id ' +
        'where task.sprint_id IN(?) ' +
        'group by column.id  ' +
        'order by column.order asc',
      [sprint_id]
    )
  }

  async statsTaskTag(sprint_id: number) {
    if (!sprint_id) sprint_id = 1
    return await this.repository.query(
      'select count(task.id) as count , tag.name , tag.id , tag.color ' +
        'from `task` ' +
        'inner join `task_has_tag` on task_has_tag.task_id = task.id ' +
        'inner join `tag` on task_has_tag.tag_id = tag.id ' +
        'where task.sprint_id = ? ' +
        'group by tag.id ' +
        'order by tag.id asc ',
      [sprint_id]
    )
  }
}
