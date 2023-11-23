import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskHasFollowerRepository } from '../repository'
import { TaskHasFollower } from '../entities'

@Injectable()
export class TaskHasFollowerService extends BaseService<TaskHasFollower> {
  constructor(public repository: TaskHasFollowerRepository) {
    super(repository)
  }

  async updateMany(dto: TaskHasFollower[]) {
    if (!dto.length) return []

    const promises = []

    await this.repository.delete({
      task_id: dto[0]?.task_id,
    })

    dto.forEach((thf) => {
      promises.push(() =>
        this.repository
          .createQueryBuilder()
          .insert()
          .into(TaskHasFollower)
          .values({ account_id: thf.account_id, task_id: thf.task_id })
          .orIgnore()
          .execute()
      )
    })

    return await Promise.all(promises.map((promise) => promise()))
  }
}
