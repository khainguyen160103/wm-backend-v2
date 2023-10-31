import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
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
}
