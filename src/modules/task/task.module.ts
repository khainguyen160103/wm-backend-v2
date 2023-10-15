import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskHasFollower, TaskTodo } from './entities'
import { TaskInColumm } from './entities/task_in_column.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo, TaskHasFollower, TaskInColumm]),
    AccountModule,
  ],
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
