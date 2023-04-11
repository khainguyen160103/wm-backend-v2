import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Public, GetCurrentUserId } from '../common/decorators'
import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from './dto'
import { Tokens } from './types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto)
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId)
  }
}
