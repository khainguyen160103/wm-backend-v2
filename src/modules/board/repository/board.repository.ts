import { EntityRepository, Repository } from 'typeorm'
import { Board } from '../entities'

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
