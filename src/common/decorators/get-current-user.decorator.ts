import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayloadWithAt } from '../../auth/types'

/** get currentUser only user in rt statergy*/
export const GetCurrentUser = createParamDecorator(
  async (data: keyof JwtPayloadWithAt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user
    return request.user[data]
  }
)
