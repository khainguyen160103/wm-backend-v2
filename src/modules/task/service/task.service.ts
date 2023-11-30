import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Task } from '../entities'
import { TaskRepository } from '../repository/task.repository'
import { AccountService } from '../../account/account.service'

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(public repository: TaskRepository, private accountService: AccountService) {
    super(repository)
  }

  async statsTaskColumn(sprint_id: number) {
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

  async statsTaskAccount(sprint_id: number) {
    const dataQuery = await this.repository.query(
      'select count(assignee_id) as count, assignee_id ' +
        'from `task` ' +
        'where sprint_id in(?) ' +
        'AND assignee_id IS NOT NULL ' +
        'group by assignee_id',
      [sprint_id]
    )

    const dataAccount = await Promise.all(
      dataQuery
        .filter((item: any) => item.assignee_id !== null)
        .map(async (item) => await this.accountService.getById(item.assignee_id))
    )

    return {
      dataQuery,
      dataAccount,
    }
  }

  async getTaskIn(account_id: number) {
    const tasks = await this.repository.query(
      'select * from task ' +
        'inner join task_has_followers ' +
        // on task_has_followers.task_id = task.id
        'where task.assignee_id = ' +
        account_id +
        ' or task_has_followers.account_id = ' +
        account_id
    )

    return [...new Set(tasks.map((task: any) => task.id))] as any
  }
}
