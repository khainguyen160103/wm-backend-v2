import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Permission } from './entities'
import { PermissionRepository } from './repository/permission.repository'

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(public repository: PermissionRepository) {
    super(repository)
  }
}
