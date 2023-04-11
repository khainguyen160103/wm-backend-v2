import { BaseService } from 'libs/services/base.service'
import { BaseEntity } from 'typeorm'

export async function getCreatedBy(T: any, service: BaseService<BaseEntity>) {
  if (T.created_by_id) T.created_by = await service.getById(T.created_by_id)

  return T
}
