import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Group } from './entities'
import { GroupRepository } from './repository/group.repository'

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(private repository: GroupRepository) {
    super(repository)
  }
}
