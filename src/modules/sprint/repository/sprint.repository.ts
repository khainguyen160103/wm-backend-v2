import { EntityRepository, Repository } from 'typeorm'
import { Sprint } from '../entities'

@EntityRepository(Sprint)
export class SprintRepository extends Repository<Sprint> {}
