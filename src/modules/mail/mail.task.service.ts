import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account/entities'
import { Task } from '../task/entities'
import { AccountService } from '../account/account.service'

@Injectable()
export class MailTaskService {
  constructor(private mailerService: MailerService, private accountService: AccountService) {}

  @OnEvent('task.assign')
  async onAssignTask(params: { accountId: number; task: Task }) {
    const { accountId, task } = params

    const account = await this.accountService.getById(accountId)
    if (!account) return
    if (!account.email) return

    await this.mailerService.sendMail({
      to: account.email,
      subject: 'Bàn giao thực hiện công việc',
      template: './mail-task-assign',
      context: {
        account,
        task,
      },
    })
  }
}
