import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailTestService } from './mail.test.service'
import { join } from 'path'

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.example.com',
        secure: false,
        auth: {
          user: 'quangtrn8821@gmail.com',
          pass: 'itwdmkkepcwiubpl',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'src/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService, MailTestService],
  exports: [MailService, MailTestService], // 👈 export for DI
})
export class MailModule {}
