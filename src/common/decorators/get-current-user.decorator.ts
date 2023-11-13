import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/** get currentUser only user in rt statergy*/
export const GetCurrentUser = createParamDecorator((data: any, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  console.log('request: ', request)
  return request.user.data
})
