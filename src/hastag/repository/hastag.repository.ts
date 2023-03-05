import { EntityRepository, Repository } from 'typeorm'
import { Hastag } from '../entities'

@EntityRepository(Hastag)
export class HastagRepository extends Repository<Hastag> {}
