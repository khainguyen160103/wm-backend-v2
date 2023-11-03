import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class MailTestService {
  constructor(private mailerService: MailerService) {}

  // account events
  @OnEvent('mail.test')
  async onMailTest() {
    await this.mailerService.sendMail({
      to: 'quangtrn8821@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './mail-password', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'quangtrn8821@gmail.com',
      },
    })
  }
}
