import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account/entities'

@Injectable()
export class MailTaskService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('task.assign')
  onAssignTask(params: { account: Account; pw_token: string }) {
    console.log('onAssignTask')
  }
}
