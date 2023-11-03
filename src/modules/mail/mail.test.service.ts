import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class MailTestService {
  constructor(private mailerService: MailerService) {}

  // account events
  @OnEvent('mail.test')
  onMailTest() {
    console.log('onMailTest: ')
  }
}
