import { BaseService } from 'libs/services/base.service'
import { ACCOUNT_SELECT_FIELDS } from 'src/constants/user.constants'
import { BaseEntity } from 'typeorm'

export async function getCreatedBy(T: any, service: BaseService<BaseEntity>) {
  if (T.created_by_id) T.created_by = await service.getById(T.created_by_id, { select: ACCOUNT_SELECT_FIELDS })

  return T
}
