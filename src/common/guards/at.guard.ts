import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService, private userService: UserService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()])
    if (isPublic) return true
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AT_SECRET,
      })

      request['user'] = payload
    } catch (error) {
      if (error) throw new UnauthorizedException()
    }

    return super.canActivate(context)
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
