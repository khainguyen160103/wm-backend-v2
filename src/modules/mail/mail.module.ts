import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailTestService } from './mail.test.service'
import { join } from 'path'
import { MailTaskService } from './mail.task.service'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'quangtrn8821@gmail.com',
          pass: 'itwdmkkepcwiubpl',
        },
      },
      defaults: {
        from: '"No Reply" <quangtrn8821@gmail.com>',
      },
      template: {
        dir: join(__dirname, '../../../templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    AccountModule,
  ],
  providers: [MailService, MailTestService, MailTaskService],
  exports: [MailService, MailTestService, MailTaskService], // 👈 export for DI
})
export class MailModule {}
