import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { ActivityType, Task, TaskActivity } from '../entities'
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
}
