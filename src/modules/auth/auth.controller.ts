import { Body, Controller, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
import { Public, GetCurrentUserId } from 'src/common/decorators'
import { AuthService } from './auth.service'
import { ChangePasswordDto, SignInDto, SignUpDto } from './dto'
import { Tokens } from './types'
import { Account } from '../account/entities'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/account')
  @HttpCode(HttpStatus.CREATED)
  createAccount(@Body() dto: SignUpDto): Promise<Account> {
    return this.authService.createAccount(dto)
  }

  @Put('/account')
  changePassword(@Body() dto: ChangePasswordDto): Promise<boolean> {
    return this.authService.changePassword(dto)
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.loginLocal(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() accountId: number): Promise<boolean> {
    return this.authService.logout(accountId)
  }
}
