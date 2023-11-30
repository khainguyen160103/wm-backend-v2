import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { ActivityType, Task, TaskActivity, TaskComment } from '../entities'
import { TaskActivityRepository } from '../repository'
import { OnEvent } from '@nestjs/event-emitter'
import { AccountService } from 'src/modules/account/account.service'

@Injectable()
export class TaskActivityService extends BaseService<TaskActivity> {
  constructor(public repository: TaskActivityRepository, private accountService: AccountService) {
    super(repository)
  }

  @OnEvent('task.assign')
  async onTaskAssign(params: { account_id: number; task: Task; project_id: number }) {
    const { account_id, task, project_id } = params
    const account = await this.accountService.getById(account_id)
    this.create({
      content: {
        project_id,
        assignee_id: task.assignee_id,
        assign_by: account,
      },
      task_id: task.id,
      type: ActivityType.ASSIGN_TASK,
    })
  }

  @OnEvent('task.comment')
  async onTaskComment(params: { account_id: number; comment: TaskComment; project_id: number }) {
    const { account_id, comment, project_id } = params
    const account = await this.accountService.getById(account_id)
    this.create({
      content: {
        project_id,
        comment_id: comment.id,
        comment_by: account,
      },
      task_id: comment.task_id,
      type: ActivityType.COMMENT,
    })
  }

  @OnEvent('task.change_column')
  async onTaskChangeStatus(params: { account_id: number; task_id: number; project_id: number; column_id: number }) {
    const { account_id, task_id, project_id, column_id } = params
    const account = await this.accountService.getById(account_id)
    this.create({
      content: {
        project_id,
        column_id,
        change_by: account,
      },
      task_id,
      type: ActivityType.CHANGE_COLUMN,
    })
  }

  @OnEvent('task.evaluate')
  async onTaskEvaluate(params: { account_id: number; task: Task; project_id: number }) {
    const { account_id, task, project_id } = params
    const account = await this.accountService.getById(account_id)
    this.create({
      content: {
        project_id,
        assignee_id: task.assignee_id,
        assign_by: account,
      },
      task_id: task.id,
      type: ActivityType.EVALUATE_TASK,
    })
  }
}
