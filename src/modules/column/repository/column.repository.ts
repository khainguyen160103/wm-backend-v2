import { EntityRepository, Repository } from 'typeorm'
import { Column } from '../entities'

@EntityRepository(Column)
export class ColumnRepository extends Repository<Column> {}
