import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Board } from './entities'
import { BoardRepository } from './repository/board.repository'

@Injectable()
export class BoardService extends BaseService<Board> {
  constructor(public repository: BoardRepository) {
    super(repository)
  }
}
