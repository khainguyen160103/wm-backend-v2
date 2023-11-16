import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { TaskFile } from '../entities'
import { TaskFileRepository } from '../repository'

@Injectable()
export class TaskFileService extends BaseService<TaskFile> {
  constructor(public repository: TaskFileRepository) {
    super(repository)
  }
}
