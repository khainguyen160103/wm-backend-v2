import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskInColumnRepository } from '../repository'
import { TaskInColumn } from '../entities'
import { ChangeTaskColumnDto } from '../dto'

@Injectable()
export class TaskInColumnService extends BaseService<TaskInColumn> {
  constructor(public repository: TaskInColumnRepository) {
    super(repository)
  }

  async changeOrder(dto: ChangeTaskColumnDto) {
    const { task_id, column_id, order } = dto
    const taskInColumn = await this.repository.findOne({
      task_id,
    })
    if (!taskInColumn) return this.create({ task_id, column_id, order })

    return await this.repository.update(
      {
        task_id,
      },
      { order, column_id }
    )
  }
}
