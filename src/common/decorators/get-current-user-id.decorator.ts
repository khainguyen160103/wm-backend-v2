import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayloadWithAt } from 'src/modules/auth/types/jwtPayloadWithAt.type'

export const GetCurrentUserId = createParamDecorator((data: any, context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest()
  const user = request.user as JwtPayloadWithAt
  return user.sub
})
