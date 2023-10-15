import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Column } from './entities'
import { ColumnRepository } from './repository/column.repository'

@Injectable()
export class ColumnService extends BaseService<Column> {
  constructor(public repository: ColumnRepository) {
    super(repository)
  }
}
