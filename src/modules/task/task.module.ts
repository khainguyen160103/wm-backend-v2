import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskTodo } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo]), AccountModule],
  controllers: [TaskController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    TaskService,
  ],
  exports: [TaskService],
})
export class TaskModule {}
