import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Before = createParamDecorator((data: any, context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest()
  const user = request.user
  return user.sub
})
