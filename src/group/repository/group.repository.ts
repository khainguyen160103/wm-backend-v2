import { EntityRepository, Repository } from 'typeorm'
import { Group } from '../entities'

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {}
