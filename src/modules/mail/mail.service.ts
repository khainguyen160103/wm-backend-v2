import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account/entities'
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
}
