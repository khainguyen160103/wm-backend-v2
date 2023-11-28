import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { ActivityType, Task, TaskActivity, TaskComment } from '../entities'
import { TaskActivityRepository } from '../repository'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class TaskActivityService extends BaseService<TaskActivity> {
  constructor(public repository: TaskActivityRepository) {
    super(repository)
  }

  @OnEvent('task.assign')
  onTaskAssign(params: { account_id: number; task: Task; project_id: number }) {
    const { account_id, task, project_id } = params
    this.create({
      content: {
        project_id,
        assignee_id: task.assignee_id,
        assign_by_id: account_id,
      },
      task_id: task.id,
      type: ActivityType.ASSIGN_TASK,
    })
  }

  @OnEvent('task.comment')
  onTaskComment(params: { account_id: number; comment: TaskComment; project_id: number }) {
    const { account_id, comment, project_id } = params
    this.create({
      content: {
        project_id,
        comment_id: comment.id,
      },
      task_id: comment.task_id,
      type: ActivityType.COMMENT,
    })
  }

  @OnEvent('task.change_column')
  onTaskChangeStatus(params: { account_id: number; task_id: number; project_id: number; column_id: number }) {
    const { account_id, task_id, project_id, column_id } = params
    this.create({
      content: {
        project_id,
        column_id,
        by_id: account_id,
      },
      task_id,
      type: ActivityType.CHANGE_COLUMN,
    })
  }

  @OnEvent('task.evaluate')
  onTaskEvaluate(params: { account_id: number; task: Task; project_id: number }) {
    const { account_id, task, project_id } = params
    this.create({
      content: {
        project_id,
        assignee_id: task.assignee_id,
        assign_by_id: account_id,
      },
      task_id: task.id,
      type: ActivityType.EVALUATE_TASK,
    })
  }
}
