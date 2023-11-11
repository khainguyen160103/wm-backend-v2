import { Body, Controller, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
import { Public, GetCurrentUserId } from 'src/common/decorators'
import { AuthService } from './auth.service'
import { ChangePasswordDto, SignInDto, SignUpDto } from './dto'
import { Tokens } from './types'
import { Account } from '../account/entities'
import { ForgotPassword } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('account')
  @HttpCode(HttpStatus.CREATED)
  createAccount(@Body() dto: SignUpDto): Promise<Account> {
    return this.authService.createAccount(dto)
  }

  @Put('account')
  changePassword(@Body() dto: ChangePasswordDto): Promise<boolean> {
    return this.authService.changePassword(dto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.loginLocal(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() accountId: number): Promise<boolean> {
    return this.authService.logout(accountId)
  }

  @Post('test/mail')
  @HttpCode(HttpStatus.OK)
  testMail() {
    return this.authService.testMail()
  }

  @Public()
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPassword) {
    return this.authService.forgotPassword(dto)
  }

  @Public()
  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  resetPasswordByEmail(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPasswordByEmail(dto)
  }
}
