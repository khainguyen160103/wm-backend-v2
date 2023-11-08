import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account/entities'
import { join } from 'path'
// import { User } from './../user/user.entity'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user?: string, token?: string) {
    const url = `example.com/auth/confirm?token=${token}`
    await this.mailerService.sendMail({
      to: 'quangtrn8821@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'quangtrn8821@gmail.com',
        url,
      },
    })
  }

  // account events
  @OnEvent('account.create')
  onAccountCreate(params: { account: Account; password: string }) {
    const { account, password } = params
    if (!account) {
      return false
    }
    this.mailerService.sendMail({
      to: account.email,
      subject: 'Tài khoản Quản lý công việc',
      template: './mail-register',
      context: {
        account,
        password,
      },
    })
  }

  @OnEvent('account.forgot.password')
  onForgotPassword(params: { account: Account; pw_token: string }) {
    const { account, pw_token } = params
    if (!account) {
      return true
    }
    this.mailerService.sendMail({
      to: account.email,
      subject: 'Cập Nhật Mật Khẩu Quản Lý Công Việc',
      template: './mail-forgot-password',
      context: {
        account,
        pw_token,
      },
    })
  }
}
