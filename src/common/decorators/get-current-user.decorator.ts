import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayloadWithAt } from '../../auth/types'

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithAt | undefined, context: ExecutionContext) => {
    // const request = context.switchToHttp().getRequest()
    // console.log('request', request.user)
    // if (!data) return request.user
    // return request.user[data]

    console.log(data, context)

    return 'currentUser'
  }
)
