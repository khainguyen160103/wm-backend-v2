import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayloadWithAt } from 'src/auth/types'

export const GetCurrentUserId = createParamDecorator((data: any, context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest()
  const user = request.user as JwtPayloadWithAt
  return user.sub
})
